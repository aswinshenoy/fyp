import strawberry
from typing import Optional

from sample.models import District
from sample.graphql.types import DistrictType


@strawberry.type
class DistrictQueries:

    @strawberry.field
    def district(self, info, slug: str) -> Optional[DistrictType]:
        try:
            return District.objects.filter(slug=slug).first()
        except District.DoesNotExist:
            return None


__all__ = [
    'DistrictQueries'
]
