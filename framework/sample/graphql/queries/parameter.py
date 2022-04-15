import strawberry
from typing import List, Optional
from django.db.models import Avg, Min, Max, Count, F

from sample.models import Location, TestRecord, State, District
from sample.graphql.types import Parameter, LocationStat, BasicLocationType
from sample.utils import METRICS


@strawberry.type
class ParameterQueries:

    @strawberry.field
    def parameter(self, info, slug: str) -> Optional[Parameter]:
        from sample.models import Parameter as PM
        try:
            return PM.objects.get(slug=slug)
        except PM.DoesNotExist:
            return None


__all__ = [
    'ParameterQueries'
]
