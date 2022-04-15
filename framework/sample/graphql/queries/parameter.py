import strawberry
from typing import List, Optional

from sample.graphql.types.parameter import BasicParameterType, ParameterType
from sample.models import Parameter


@strawberry.type
class ParameterQueries:

    @strawberry.field
    def parameters(self, info) -> List[BasicParameterType]:
        return Parameter.objects.all()

    @strawberry.field
    def parameter(self, info, slug: str) -> Optional[ParameterType]:
        try:
            return Parameter.objects.get(slug=slug)
        except Parameter.DoesNotExist:
            return None


__all__ = [
    'ParameterQueries'
]
