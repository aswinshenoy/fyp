from typing import List, Optional

import strawberry

from sample.models import Location
from sample.graphql.types import BasicLocationType, LocationType, LocationStat


@strawberry.type
class SampleManagementQueries:

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

    @strawberry.field
    def location_stats(
        self, info,
        metric: str,
        isAsc: Optional[bool] = False, count: Optional[int] = 5
    ) -> List[LocationStat]:
        qs = Location.objects.all().order_by(f"{'' if isAsc else '-'}{metric}")[:count]
        data = []
        rank = 0
        for q in qs:
            rank += 1
            data.append(LocationStat(
                rank=rank,
                location=q,
                value=q.__getattribute__(metric)
            ))
        return data


__all__ = [
    'SampleManagementQueries',
]