from typing import List, Optional

import strawberry
from django.db.models import Avg, F

from framework.graphql.types import JSONScalar
from .district import DistrictQueries
from .location import LocationQueries
from .parameter import ParameterQueries
from .search import SearchQueries
from ..types.source import BasicTestSourceType
from ..types.state import BasicStateType
from ...utils import calculate_wqi


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

    @strawberry.field
    def stats(self, info) -> Optional[JSONScalar]:
        from sample.models import TestRecord, Location, District, State, Parameter
        avg = TestRecord.objects.filter(
            parameter__slug='wqi'
        ).annotate(year=F('timestamp__year')).values('year').annotate(avg=Avg('value')).values('year', 'avg')
        data = {}
        for d in avg:
            data[d['year']] = d['avg']
        return {
            "avgWQI": TestRecord.objects.filter(parameter__slug='wqi').aggregate(avg=Avg('value'))['avg'],
            "parameters": Parameter.objects.all().count(),
            "records": TestRecord.objects.all().count(),
            "states": State.objects.all().count(),
            "districts": District.objects.all().count(),
            "panchayats": Location.objects.all().count(),
            "wqiYearly": data
        }

    @strawberry.field
    def calculateWQI(self, params: JSONScalar) -> Optional[float]:
        return calculate_wqi(
            manganese=params['mn'] if 'mn' in params and params['mn'] != '' else 0,
            iron=params['fe'] if 'fe' in params and params['fe'] != '' else 0,
            nitrate=params['no2'] if 'no2' in params and params['no2'] != '' else 0,
            arsenic=params['as'] if 'as' in params and params['as'] != '' else 0,
            fluoride=params['f'] if 'f' in params and params['f'] != '' else 0,
            chloride=params['cl'] if 'cl' in params and params['cl'] != '' else 0,
            sulphate=params['sl'] if 'sl' in params and params['sl'] != '' else 0,
            copper=params['cu'] if 'cu' in params and params['cu'] != '' else 0,
            tds=params['tds'] if 'tds' in params and params['tds'] != '' else 0,
            ph=params['ph'] if 'ph' in params and params['ph'] != '' else 0,
            hardness=params['hd'] if 'hd' in params and params['hd'] != '' else 0,
            alkalinity=params['alk'] if 'alk' in params and params['alk'] != '' else 0,
            turbidity=params['trb'] if 'trb' in params and params['trb'] != '' else 0,
        )


__all__ = [
    'SampleQueries'
]
