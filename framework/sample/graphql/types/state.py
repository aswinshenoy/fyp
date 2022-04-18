import strawberry
from typing import Optional, List


@strawberry.type
class BasicStateType:
    id: strawberry.ID
    slug: str
    name: str


@strawberry.type
class StateType:
    id: strawberry.ID
    name: str

    def districts(self, info) -> Optional[List[strawberry.LazyType["BasicDistrictType", "sample.graphql.types.district"]]]:
        from sample.models import District
        return District.objects.filter(state=self).all()


__all__ = [
    'BasicStateType',
]
