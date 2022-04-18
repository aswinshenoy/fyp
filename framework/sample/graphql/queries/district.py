import strawberry
from typing import Optional, List

from sample.models import District
from sample.graphql.types.district import BasicDistrictType, DistrictType


@strawberry.type
class DistrictQueries:

    @strawberry.field
    def districts(self, info, keyword: str) -> Optional[List[BasicDistrictType]]:
        if len(keyword) < 3:
            return []
        qs = District.objects.all()
        qs = qs.filter(name__istartswith=keyword)
        return qs

    @strawberry.field
    def district(self, info, id: Optional[strawberry.ID] = None, slug: Optional[str] = None) -> Optional[DistrictType]:
        try:
            if id is not None:
                return District.objects.get(id=id)
            else:
                return District.objects.get(slug=slug)
        except District.DoesNotExist:
            return None


__all__ = [
    'DistrictQueries'
]
