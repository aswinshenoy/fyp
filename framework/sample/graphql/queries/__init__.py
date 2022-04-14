import strawberry

from .district import DistrictQueries
from .location import LocationQueries
from .parameter import ParameterQueries


@strawberry.type
class SampleQueries(
    DistrictQueries,
    LocationQueries,
    ParameterQueries
):
    pass


__all__ = [
    'SampleQueries'
]
