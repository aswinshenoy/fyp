from datetime import date
from typing import Optional

import strawberry

from sample.models import Location


@strawberry.type
class SampleManagementMutations:

    @strawberry.mutation
    def importCSV(self, info, state: str) -> Optional[bool]:
        import json
        f = open('data.json')
        data = json.load(f)
        samples = []
        locationMap = {}
        for d in data:
            if d['loc'] in locationMap:
                location = locationMap[d['loc']]
            else:
                try:
                    location = Location.objects.get(name=d['loc']).id
                except Location.DoesNotExist:
                    location = Location.objects.create(
                        name=d['loc'],
                        state=state
                    ).id
                    locationMap[d['loc']] = location

            try:
                month = int(d['mon']) if (0 < int(d['mon']) < 13) else 1 if d['mon'] == '' else 1
                year = int(d['yr']) if (0 < int(d['yr']) < 2022) else 2022 if d['yr'] != '' else 2022
            except Exception:
                print(d['yr'])
                month = 1
                year = 2022
            _date = date(year, month, 1)

            sample = TestSample(
                location_id=location,
                date=_date,
                source=d['src'],
                manganese=float(d['mn']) if d['mn'] else 0,
                iron=float(d['fe']) if d['fe'] else 0,
                nitrate=float(d['no2']) if d['no2'] else 0,
                arsenic=float(d['as']) if d['as'] else 0,
                fluoride=float(d['f']) if d['f'] else 0,
                chloride=float(d['cl']) if d['cl'] else 0,
                sulphate=float(d['sl']) if d['sl'] else 0,
                copper=float(d['cu']) if d['cu'] else 0,
                tds=float(d['tds']) if d['tds'] else 0,
                ph=float(d['ph']) if d['ph'] else 0,
                hardness=float(d['hd']) if d['hd'] else 0,
                alkalinity=float(d['alk']) if d['alk'] else 0,
                turbidity=float(d['trb']) if d['trb'] else 0,
                coliform=float(d['coli']) if d['coli'] != '' else 0,
                ecoil=float(d['ecol']) if d['ecol'] != '' else 0,
            )
            sample.set_wqi()
            samples.append(sample)
        TestSample.objects.bulk_create(samples)
        return True


__all__ = [
    'SampleManagementMutations'
]
