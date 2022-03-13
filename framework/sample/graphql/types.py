from datetime import date
from typing import List

import strawberry


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
class BasicLocationType:
    id: strawberry.ID
    name: str
    district: str
    state: str
    wqi: WQIType


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


@strawberry.type
class LocationTestStat:
    totalSamples: int
    firstRecorded: date
    lastRecorded: date

    def yearlySamples(self) -> List[YearlyValueType]:
        return self.trends['yearlySamples']


@strawberry.type
class LocationType(BasicLocationType):

    @strawberry.field
    def test_stats(self, info) -> LocationTestStat:
        return self  # type: ignore

    @strawberry.field
    def yearly_wqi(self, info) -> List[YearlyWQIType]:
        return self.trends['yearlyWQI']  # type: ignore

    @strawberry.field
    def avgMetrics(self, info) -> LocationMetricAverages:
        return self  # type: ignore


@strawberry.type
class LocationStat:
    rank: int
    location: BasicLocationType
    value: float


__all__ = [
    'BasicLocationType',
    'LocationType',
    'LocationStat'
]
