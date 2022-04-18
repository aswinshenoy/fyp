import strawberry
from typing import Optional, List

from .location import BasicLocationType
from .shared import StatGeneratorType


@strawberry.type
class BasicDistrictType:
    id: strawberry.ID
    slug: str
    name: str


@strawberry.type
class DistrictType(BasicDistrictType):
    state: Optional[strawberry.LazyType["BasicStateType", "sample.graphql.types.state"]]

    @strawberry.field
    def locations(self, info, keyword: Optional[str] = None) -> Optional[List[BasicLocationType]]:
        from sample.models import Location
        qs = Location.objects.filter(district=self)
        if keyword:
            qs = qs.filter(name__istartswith=keyword)
        return qs  # type: ignore

    @strawberry.field
    def stats(self, info) -> StatGeneratorType:
        from sample.models import TestRecord
        return {'qs': TestRecord.objects.filter(location__district=self)}  # type: ignore


__all__ = [
    'BasicDistrictType',
    'DistrictType'
]
