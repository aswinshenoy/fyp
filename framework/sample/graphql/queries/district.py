import strawberry
from typing import Optional

from sample.models import Location
from sample.graphql.types import DistrictType


@strawberry.type
class DistrictQueries:

    @strawberry.field
    def district(self, info, slug: str) -> Optional[DistrictType]:
        lc = Location.objects.filter(district__iexact=slug).first()
        if lc:
            return DistrictType(
                name=lc.district,
                state=lc.state
            )
        return None


__all__ = [
    'DistrictQueries'
]
