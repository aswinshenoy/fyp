from datetime import datetime

from django.core.management import BaseCommand

from sample.models import State, District, ParameterGroup, Parameter, TestSourceType, Location, TestRecord


def calculate_wqi(
    manganese, iron, nitrate, arsenic, chloride, fluoride, sulphate, copper, tds, ph, hardness, alkalinity, turbidity
):
    manganese = round(((float(manganese) / 0.1) * 100 * 0.789), 4)
    iron = round((float(iron) / 0.3) * 100 * 0.026, 4)
    nitrate = round((float(nitrate) / 45) * 100 * 0.135, 4)
    arsenic = round((float(arsenic) / 0.01) * 100 * 0.1315, 4)
    fluoride = round((float(fluoride) / 1) * 100 * 0.1315, 4)
    chloride = round((float(chloride) / 250) * 100 * 0.1315, 4)
    sulphate = round((float(sulphate) / 200) * 100 * 0.789, 4)
    copper = round((float(copper) / 0.05) * 100 * 0.789, 4)
    tds = round((float(tds) / 500) * 100 * 0.0789, 4)

    ph = round((float(ph) - 7) / (8.5 - 7) * 100 * 0.0789, 4)
    hardness = round((float(hardness) / 200) * 100 * 0.02631, 4)
    alkalinity = round((float(alkalinity) / 200) * 100 * 0.0263, 4)
    turbidity = round((float(turbidity) / 200) * 100 * 0.0263, 4)

    return round(
        (
            manganese +
            iron +
            nitrate +
            arsenic +
            fluoride +
            chloride +
            sulphate +
            copper +
            tds +
            ph +
            hardness +
            alkalinity +
            turbidity
        ),
        5
    )


class Command(BaseCommand):
    help = 'Populates database with sample data'

    def handle(self, *args, **options):
        import os
        import django

        os.environ['DJANGO_SETTINGS_MODULE'] = 'framework.settings'
        django.setup()
        django.core.management.execute_from_command_line(['manage.py', 'migrate'])

        import json
        f = open('data/states.json')
        states = json.load(f)
        f.close()

        statesData = []
        for s in states:
            statesData.append(
                State(
                    name=s['name'],
                    slug=s['slug'],
                )
            )
        State.objects.bulk_create(statesData)

        f = open('data/districts.json')
        districts = json.load(f)
        f.close()

        districtsData = []
        slugs = []
        from django.template.defaultfilters import slugify
        for d in districts:
            slug = slugify(d['name'])
            while slug in slugs:
                slug += f'-{d["state"]}'
            slugs.append(slug)
            districtsData.append(
                District(
                    name=d['name'],
                    slug=slug,
                    state=State.objects.get(slug=d['state'])
                )
            )
        District.objects.bulk_create(districtsData)

        f = open('data/parameter-groups.json')
        parameterGroups = json.load(f)
        f.close()

        parameterGroupsData = []
        for pg in parameterGroups:
            parameterGroupsData.append(
                ParameterGroup(
                    name=pg['name'],
                    slug=pg['slug'],
                )
            )
        ParameterGroup.objects.bulk_create(parameterGroupsData)

        f = open('data/parameters.json')
        parameters = json.load(f)
        f.close()

        parametersData = []
        for p in parameters:
            parametersData.append(
                Parameter(
                    name=p['name'],
                    slug=p['slug'],
                    group=ParameterGroup.objects.get(slug=p['group']) if p['group'] else None,
                    minValue=p['minValue'],
                    maxValue=p['maxValue'],
                )
            )
        Parameter.objects.bulk_create(parametersData)

        f = open('data/test-sources.json')
        testSources = json.load(f)
        f.close()

        testSourcesData = []
        for ts in testSources:
            testSourcesData.append(
                TestSourceType(
                    name=ts['name'],
                    slug=ts['slug'],
                )
            )
        TestSourceType.objects.bulk_create(testSourcesData)

        f = open('data.json')
        data = json.load(f)
        f.close()

        records = []

        locationMap = {}
        district = District.objects.get(name='Thiruvananthapuram')
        for d in data:
            if d['loc'] in locationMap:
                location = locationMap[d['loc']]
            else:
                try:
                    location = Location.objects.get(name=d['loc']).id
                except Location.DoesNotExist:
                    location = Location.objects.create(
                        name=d['loc'],
                        district=district
                    ).id
                    locationMap[d['loc']] = location

            try:
                month = int(d['mon']) if (0 < int(d['mon']) < 13) else 1 if d['mon'] == '' else 1
                year = int(d['yr']) if (0 < int(d['yr']) < 2022) else 2022 if d['yr'] != '' else 2022
            except Exception:
                print(d['yr'])
                month = 1
                year = 2022
            timestamp = datetime(year, month, 1)

            source = None
            if 'src' in d and d['src'] and len(d['src']) > 0:
                try:
                    source = TestSourceType.objects.get(slug=d['src'])
                except Exception:
                    print(d['src'])
                    pass

            if d['mn'] != '':
                manganese = TestRecord(
                    location_id=location,
                    source=source,
                    timestamp=timestamp
                )
                manganese.parameter = Parameter.objects.get(slug='manganese')
                manganese.value = d['mn']
                records.append(manganese)

            if d['fe'] != '':
                iron = TestRecord(
                    location_id=location,
                    source=source,
                    timestamp=timestamp
                )
                iron.parameter = Parameter.objects.get(slug='iron')
                iron.value = d['fe']
                records.append(iron)

            if d['no2'] != '':
                nitrate = TestRecord(
                    location_id=location,
                    source=source,
                    timestamp=timestamp
                )
                nitrate.parameter = Parameter.objects.get(slug='nitrate')
                nitrate.value = d['no2']
                records.append(nitrate)

            if d['as'] != '':
                arsenic = TestRecord(
                    location_id=location,
                    source=source,
                    timestamp=timestamp
                )
                arsenic.parameter = Parameter.objects.get(slug='arsenic')
                arsenic.value = d['as']
                records.append(arsenic)

            if d['f'] != '':
                fluoride = TestRecord(
                    location_id=location,
                    source=source,
                    timestamp=timestamp
                )
                fluoride.parameter = Parameter.objects.get(slug='fluoride')
                fluoride.value = d['f']
                records.append(fluoride)

            if d['cl'] != '':
                chloride = TestRecord(
                    location_id=location,
                    source=source,
                    timestamp=timestamp
                )
                chloride.parameter = Parameter.objects.get(slug='chloride')
                chloride.value = d['cl']
                records.append(chloride)

            if d['sl'] != '':
                sulphate = TestRecord(
                    location_id=location,
                    source=source,
                    timestamp=timestamp
                )
                sulphate.parameter = Parameter.objects.get(slug='sulphate')
                sulphate.value = d['sl']
                records.append(sulphate)

            if d['cu'] != '':
                copper = TestRecord(
                    location_id=location,
                    source=source,
                    timestamp=timestamp
                )
                copper.parameter = Parameter.objects.get(slug='copper')
                copper.value = d['cu']
                records.append(copper)

            if d['tds'] != '':
                tds = TestRecord(
                    location_id=location,
                    source=source,
                    timestamp=timestamp
                )
                tds.parameter = Parameter.objects.get(slug='tds')
                tds.value = d['tds']
                records.append(tds)

            if d['ph'] != '':
                ph = TestRecord(
                    location_id=location,
                    source=source,
                    timestamp=timestamp
                )
                ph.parameter = Parameter.objects.get(slug='ph')
                ph.value = d['ph']
                records.append(ph)

            if d['hd'] != '':
                hardness = TestRecord(
                    location_id=location,
                    source=source,
                    timestamp=timestamp
                )
                hardness.parameter = Parameter.objects.get(slug='hardness')
                hardness.value = d['hd']
                records.append(hardness)

            if d['alk'] != '':
                alkalinity = TestRecord(
                    location_id=location,
                    source=source,
                    timestamp=timestamp
                )
                alkalinity.parameter = Parameter.objects.get(slug='alkalinity')
                alkalinity.value = d['alk']
                records.append(alkalinity)

            if d['trb'] != '':
                turbidity = TestRecord(
                    location_id=location,
                    source=source,
                    timestamp=timestamp
                )
                turbidity.parameter = Parameter.objects.get(slug='turbidity')
                turbidity.value = d['trb']
                records.append(turbidity)

            if d['coli'] != '':
                coliform = TestRecord(
                    location_id=location,
                    source=source,
                    timestamp=timestamp
                )
                coliform.parameter = Parameter.objects.get(slug='coliform')
                coliform.value = d['coli']
                records.append(coliform)

            if d['ecol'] != '':
                ecoli = TestRecord(
                    location_id=location,
                    source=source,
                    timestamp=timestamp
                )
                ecoli.parameter = Parameter.objects.get(slug='ecoli')
                ecoli.value = d['ecol']
                records.append(ecoli)

            wqi = calculate_wqi(
                manganese=d['mn'] if d['mn'] != '' else 0,
                iron=d['fe'] if d['fe'] != '' else 0,
                nitrate=d['no2'] if d['no2'] != '' else 0,
                arsenic=d['as'] if d['as'] != '' else 0,
                fluoride=d['f'] if d['f'] != '' else 0,
                chloride=d['cl'] if d['cl'] != '' else 0,
                sulphate=d['sl'] if d['sl'] != '' else 0,
                copper=d['cu'] if d['cu'] != '' else 0,
                tds=d['tds'] if d['tds'] != '' else 0,
                ph=d['ph'] if d['ph'] != '' else 0,
                hardness=d['hd'] if d['hd'] != '' else 0,
                alkalinity=d['alk'] if d['alk'] != '' else 0,
                turbidity=d['trb'] if d['trb'] != '' else 0,
                # coliform=coliform,
                # ecoli=ecoli
            )
            wqiObj = TestRecord(
                location_id=location,
                source=source,
                timestamp=timestamp
            )
            wqiObj.parameter = Parameter.objects.get(slug='wqi')
            wqiObj.value = wqi
            records.append(wqiObj)
        TestRecord.objects.bulk_create(records)
