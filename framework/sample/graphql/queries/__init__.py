from typing import List

import strawberry

from .district import DistrictQueries
from .location import LocationQueries
from .parameter import ParameterQueries
from .search import SearchQueries
from ..types.source import BasicTestSourceType
from ..types.state import BasicStateType


@strawberry.type
class SampleQueries(
    DistrictQueries,
    LocationQueries,
    ParameterQueries,
    SearchQueries,
):

    @strawberry.field
    def states(self, info, keyword: str) -> List[BasicStateType]:
        from sample.models import State
        if len(keyword) < 3:
            return []
        qs = State.objects.all()
        qs = qs.filter(name__istartswith=keyword)
        return qs

    @strawberry.field
    def years(self, info) -> List[int]:
        from sample.models import TestRecord
        return TestRecord.objects.values('timestamp__year').distinct().order_by('-timestamp__year').values_list(
            'timestamp__year', flat=True
        )

    @strawberry.field
    def sources(self, info) -> List[BasicTestSourceType]:
        from sample.models import TestSourceType
        return TestSourceType.objects.all().order_by('name')


__all__ = [
    'SampleQueries'
]
