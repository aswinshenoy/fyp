import strawberry
from typing import List, Optional
from datetime import date
from django.db.models import Avg, F

from framework.graphql.types import JSONScalar
from .shared import StatGeneratorType
from .parameter import ParameterStatType
from .shared import ContaminationStat, WQIType


@strawberry.type
class LocationTestStat:
    totalSamples: int
    firstRecorded: date
    lastRecorded: date

    # @strawberry.field
    # def yearlySamples(self) -> List[YearlyValueType]:
    #     return self.trends['yearlySamples']


@strawberry.type
class BasicLocationType:
    id: strawberry.ID
    name: str
    type: str
    district: Optional[strawberry.LazyType["BasicDistrictType", "sample.graphql.types.district"]] = None

    @strawberry.field
    def state(self, info) -> Optional[strawberry.LazyType["BasicStateType", "sample.graphql.types.state"]]:
        if self.district and self.district.state:
            return self.district.state

    @strawberry.field
    def wqi(self, info) -> Optional[WQIType]:
        from sample.models import TestRecord
        return TestRecord.objects.filter(location=self, parameter__slug='wqi').aggregate(wqi=Avg("value"))['wqi']


@strawberry.type
class LocationType(BasicLocationType):

    @strawberry.field
    def contamination(self) -> ContaminationStat:
        from sample.models import TestRecord
        return {
            'qs': TestRecord.objects.filter(location=self),
            'total': TestRecord.objects.filter(location=self).count()
        }

    @strawberry.field
    def yearly_trend(self, info) -> JSONScalar:
        from sample.models import TestRecord, Parameter
        data = {}
        for p in Parameter.objects.all():
            avg = TestRecord.objects.filter(
                location=self,
                parameter=p
            ).annotate(year=F('timestamp__year')).values('year').annotate(avg=Avg('value')).values('year', 'avg')
            pData = {}
            for d in avg:
                pData[d['year']] = d['avg']
            data[p.slug] = pData
        return data

    @strawberry.field
    def test_stats(self, info) -> LocationTestStat:
        return self  # type: ignore

    @strawberry.field
    def stats(self, info) -> StatGeneratorType:
        from sample.models import TestRecord
        return {'qs': TestRecord.objects.filter(location=self)}


@strawberry.type
class LocationStat:
    rank: int
    location: BasicLocationType
    value: float
    maxValue: float
    minValue: float
    samples: int


__all__ = [
    'BasicLocationType',
    'LocationType',
    'LocationStat'
]
