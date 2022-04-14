import strawberry
from typing import List, Optional
from django.db.models import Avg, Min, Max, Count

from sample.models import Location, TestSample
from sample.graphql.types import Parameter, LocationStat
from sample.utils import METRICS


@strawberry.type
class ParameterQueries:

    @strawberry.field
    def parameter(
        self, info,
        slug: str,
        isAsc: Optional[bool] = False, count: Optional[int] = 50
    ) -> Optional[Parameter]:
        if slug not in METRICS.keys():
            return None
        qs = TestSample.objects.values('location').annotate(
            avg=Avg(slug),
            min=Min(slug),
            max=Max(slug),
            samples=Count('location'),
        ).values('location', 'avg', 'min', 'max', 'samples').order_by(f"{'' if isAsc else '-'}avg")[:count]

        locationIDs = []
        for l in qs:
            locationIDs.append(l['location'])

        ls = Location.objects.filter(id__in=locationIDs)
        lsMap = {}
        for l in ls:
            lsMap[l.id] = l

        data = []
        rank = 0
        for q in qs:
            rank += 1
            data.append(LocationStat(
                rank=rank,
                location=lsMap[q['location']],
                value=q['avg'],
                minValue=q['min'],
                maxValue=q['max'],
                samples=q['samples']
            ))
        return Parameter(
            name=METRICS[slug]['name'],
            locations=data
        )


__all__ = [
    'ParameterQueries'
]
