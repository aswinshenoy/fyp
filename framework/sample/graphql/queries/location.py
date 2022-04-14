from typing import List, Optional

import strawberry

from sample.models import Location
from sample.graphql.types import BasicLocationType, LocationType


@strawberry.type
class LocationQueries:

    @strawberry.field
    def locations(self, info, keyword: Optional[str] = None) -> List[BasicLocationType]:
        qs = Location.objects.all()
        if keyword:
            qs = qs.filter(name__istartswith=keyword)
        return qs  # type: ignore

    @strawberry.field
    def location(self, info, id: strawberry.ID) -> Optional[LocationType]:
        try:
            return Location.objects.get(id=id)
        except Location.DoesNotExist:
            return None


__all__ = [
    'LocationQueries'
]
