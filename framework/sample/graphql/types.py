from datetime import date
from typing import List, Optional

import strawberry
from django.db.models import Q, Avg


@strawberry.type
class WQIType:

    @strawberry.field
    def value(self) -> float:
        return self  # type: ignore

    @strawberry.field
    def group(self) -> str:
        if self < 50:
            return 'Excellent'
        elif self < 100:
            return 'Good'
        elif self < 200:
            return 'Poor'
        elif self < 300:
            return 'Very Poor'
        return 'Unsuitable'


@strawberry.type
class LocationMetricAverages:
    manganese: float
    iron: float
    nitrate: float
    arsenic: float
    fluoride: float
    chloride: float
    sulphate: float
    copper: float
    tds: float
    ph: float
    hardness: float
    alkalinity: float
    turbidity: float
    wqi: WQIType
    ecoil: float
    coliform: float


@strawberry.type
class BasicLocationType:
    id: strawberry.ID
    name: str
    district: str
    state: str

    @strawberry.field
    def wqi(self, info) -> WQIType:
        from sample.models import TestSample
        return TestSample.objects.filter(location=self).aggregate(wqi=Avg("wqi"))['wqi']


@strawberry.type
class DistrictType:
    name: str
    state: str

    @strawberry.field
    def locations(self, info, keyword: Optional[str] = None) -> List[BasicLocationType]:
        from sample.models import Location
        qs = Location.objects.filter(district__iexact=self.name)
        if keyword:
            qs = qs.filter(name__istartswith=keyword)
        return qs  # type: ignore

    @strawberry.field
    def avgMetrics(self, info) -> LocationMetricAverages:
        from django.db.models import Avg
        from sample.models import TestSample
        r = TestSample.objects.filter(location__district__iexact=self.name).aggregate(
            manganese=Avg("manganese"),
            iron=Avg("iron"),
            nitrate=Avg("nitrate"),
            arsenic=Avg("arsenic"),
            fluoride=Avg("fluoride"),
            chloride=Avg("chloride"),
            sulphate=Avg("sulphate"),
            copper=Avg("copper"),
            tds=Avg("tds"),
            ph=Avg("ph"),
            turbidity=Avg("turbidity"),
            alkalinity=Avg("alkalinity"),
            hardness=Avg("hardness"),
            ecoil=Avg("ecoil"),
            coliform=Avg("coliform"),
            wqi=Avg("wqi"),
        )
        return LocationMetricAverages(
            manganese=r['manganese'],
            iron=r['iron'],
            nitrate=r['nitrate'],
            arsenic=r['arsenic'],
            fluoride=r['fluoride'],
            chloride=r['chloride'],
            sulphate=r['sulphate'],
            copper=r['copper'],
            tds=r['tds'],
            ph=r['ph'],
            turbidity=r['turbidity'],
            alkalinity=r['alkalinity'],
            hardness=r['hardness'],
            ecoil=r['ecoil'],
            coliform=r['coliform'],
            wqi=r['wqi']
        )


@strawberry.type
class YearlyValueType:

    @strawberry.field
    def value(self) -> float:
        return self['value']

    @strawberry.field
    def year(self) -> int:
        return self['year']


@strawberry.type
class YearlyWQIType:

    @strawberry.field
    def wqi(self) -> WQIType:
        return self['wqi']

    @strawberry.field
    def year(self) -> int:
        return self['year']


@strawberry.type
class ContaminationTypeStat:
    value: int
    percent: float


@strawberry.type
class ContaminationStat:

    @strawberry.field
    def physical(self) -> ContaminationTypeStat:
        from sample.models import TestSample
        count = TestSample.objects.filter(
            Q(location=self['location']) &
            Q(
                Q(tds__gt=200) |
                Q(ph__lt=6.5) |
                Q(ph__gt=8.5) |
                Q(hardness__gt=200) |
                Q(alkalinity__gt=200)
            )
        ).count()
        return ContaminationTypeStat(
            value=count,
            percent=(count/self['total'])*100
        )

    @strawberry.field
    def chemical(self) -> ContaminationTypeStat:
        from sample.models import TestSample
        count = TestSample.objects.filter(
            Q(location=self['location']) &
            Q(
                Q(chloride__gt=250) |
                Q(copper__gt=0.05) |
                Q(fluoride__gt=1) |
                Q(manganese__gt=0.1) |
                Q(iron__gt=0.3) |
                Q(nitrate__gt=45) |
                Q(sulphate__gt=200) |
                Q(arsenic__gt=0.01)
            )
        ).count()
        return ContaminationTypeStat(
            value=count,
            percent=(count / self['total'])*100
        )

    @strawberry.field
    def biological(self) -> ContaminationTypeStat:
        from sample.models import TestSample
        count = TestSample.objects.filter(
            Q(location=self['location']) &
            Q(
                Q(ecoil__gt=100) |
                Q(coliform__gt=100)
            )
        ).count()
        return ContaminationTypeStat(
            value=count,
            percent=(count / self['total'])*100
        )


@strawberry.type
class LocationTestStat:
    totalSamples: int
    firstRecorded: date
    lastRecorded: date

    @strawberry.field
    def yearlySamples(self) -> List[YearlyValueType]:
        return self.trends['yearlySamples']


@strawberry.type
class LocationType(BasicLocationType):

    @strawberry.field
    def contamination(self) -> ContaminationStat:
        from sample.models import TestSample
        return {
            'location': self,
            'total': TestSample.objects.filter(location=self).count()
        }

    @strawberry.field
    def test_stats(self, info) -> LocationTestStat:
        return self  # type: ignore

    @strawberry.field
    def yearly_wqi(self, info) -> List[YearlyWQIType]:
        return []

    @strawberry.field
    def avgMetrics(self, info) -> LocationMetricAverages:
        from django.db.models import Avg
        from sample.models import TestSample
        r = TestSample.objects.filter(location=self).aggregate(
            manganese=Avg("manganese"),
            iron=Avg("iron"),
            nitrate=Avg("nitrate"),
            arsenic=Avg("arsenic"),
            fluoride=Avg("fluoride"),
            chloride=Avg("chloride"),
            sulphate=Avg("sulphate"),
            copper=Avg("copper"),
            tds=Avg("tds"),
            ph=Avg("ph"),
            turbidity=Avg("turbidity"),
            alkalinity=Avg("alkalinity"),
            hardness=Avg("hardness"),
            ecoil=Avg("ecoil"),
            coliform=Avg("coliform"),
            wqi=Avg("wqi"),
        )
        return LocationMetricAverages(
            manganese=r['manganese'],
            iron=r['iron'],
            nitrate=r['nitrate'],
            arsenic=r['arsenic'],
            fluoride=r['fluoride'],
            chloride=r['chloride'],
            sulphate=r['sulphate'],
            copper=r['copper'],
            tds=r['tds'],
            ph=r['ph'],
            turbidity=r['turbidity'],
            alkalinity=r['alkalinity'],
            hardness=r['hardness'],
            ecoil=r['ecoil'],
            coliform=r['coliform'],
            wqi=r['wqi']
        )


@strawberry.type
class LocationStat:
    rank: int
    location: BasicLocationType
    value: float
    maxValue: float
    minValue: float
    samples: int


@strawberry.type
class Parameter:
    name: str
    locations: List[LocationStat]


__all__ = [
    'DistrictType',
    'BasicLocationType',
    'LocationType',
    'LocationStat',
    'Parameter'
]
