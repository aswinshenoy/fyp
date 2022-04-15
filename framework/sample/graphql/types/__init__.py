import strawberry

from .shared import WQIType, WaterParameters
from .district import DistrictType
from .location import LocationType, BasicLocationType


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


__all__ = [
    'DistrictType',
    'BasicLocationType',
    'LocationType',
]
