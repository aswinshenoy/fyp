from typing import List

import strawberry

from .district import DistrictQueries
from .location import LocationQueries
from .parameter import ParameterQueries
from .search import SearchQueries


@strawberry.type
class SampleQueries(
    DistrictQueries,
    LocationQueries,
    ParameterQueries,
    SearchQueries,
):

    @strawberry.field
    def years(self, info) -> List[int]:
        from sample.models import TestRecord
        return TestRecord.objects.values('timestamp__year').distinct().order_by('-timestamp__year').values_list(
            'timestamp__year', flat=True
        )


__all__ = [
    'SampleQueries'
]
