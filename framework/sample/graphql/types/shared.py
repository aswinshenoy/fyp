from typing import Optional, List

import strawberry
from django.db.models import Avg, Q, F, Count

from framework.graphql.types import JSONScalar
from .parameter import ParameterStatType


@strawberry.type
class WQIType:

    @strawberry.field
    def value(self) -> float:
        return self  # type: ignore

    @strawberry.field
    def group(self) -> str:
        if self < 50:
            return 'Excellent'
        elif self < 100:
            return 'Good'
        elif self < 200:
            return 'Poor'
        elif self < 300:
            return 'Very Poor'
        return 'Unsuitable'


@strawberry.type
class ContaminationTypeStat:
    value: int
    percent: float


@strawberry.type
class ContaminationStat:

    @strawberry.field
    def physical(self) -> ContaminationTypeStat:
        from sample.models import Parameter
        params = Parameter.objects.filter(group__slug='physical')
        count = 0
        for p in params:
            newQS = self['qs']
            count += newQS.filter(
                parameter=p,
            ).filter(
                Q(value__gt=p.maxValue) |
                Q(value__lt=p.minValue)
            ).count()
        return ContaminationTypeStat(
            value=count,
            percent=(count/self['qs'].filter(parameter__group__slug='physical').count())*100
        )

    @strawberry.field
    def chemical(self) -> ContaminationTypeStat:
        from sample.models import Parameter
        params = Parameter.objects.filter(group__slug='chemical')
        count = 0
        for p in params:
            newQS = self['qs']
            count += newQS.filter(
                parameter=p,
            ).filter(
                Q(value__gt=p.maxValue) |
                Q(value__lt=p.minValue)
            ).count()
        return ContaminationTypeStat(
            value=count,
            percent=(count / self['qs'].filter(parameter__group__slug='chemical').count()) * 100
        )

    @strawberry.field
    def biological(self) -> ContaminationTypeStat:
        from sample.models import Parameter
        params = Parameter.objects.filter(group__slug='biological')
        count = 0
        for p in params:
            newQS = self['qs']
            count += newQS.filter(
                parameter=p,
            ).filter(
                Q(value__gt=p.maxValue) |
                Q(value__lt=p.minValue)
            ).count()
        return ContaminationTypeStat(
            value=count,
            percent=(count / self['qs'].filter(parameter__group__slug='biological').count()) * 100
        )


@strawberry.type
class SourceBreakUpType:
    source: strawberry.LazyType["BasicTestSourceType", "sample.graphql.types.source"]
    count: int


@strawberry.type
class StatGeneratorType:

    @strawberry.field
    def wqi(self, info) -> Optional[WQIType]:
        return self['qs'].filter(parameter__slug='wqi').aggregate(wqi=Avg("value"))['wqi']

    @strawberry.field
    def yearly_trend(self, info) -> JSONScalar:
        from sample.models import Parameter
        data = {}
        for p in Parameter.objects.all():
            avg = self['qs'].filter(
                parameter=p
            ).annotate(year=F('timestamp__year')).values('year').annotate(avg=Avg('value')).values('year', 'avg')
            pData = {}
            for d in avg:
                pData[d['year']] = d['avg']
            data[p.slug] = pData
        return data

    @strawberry.field
    def source_breakup(self, info) -> Optional[List[SourceBreakUpType]]:
        breakup = self['qs'].values('source').annotate(count=Count('source')).order_by('-count').values(
            'source_id', 'count'
        )
        from sample.models import TestSourceType
        sources = TestSourceType.objects.all()
        sourceMap = {}
        for s in sources:
            sourceMap[s.id] = s
        data = []
        for b in breakup:
            if 'source_id' in b and b['source_id'] and b['source_id'] in sourceMap:
                data.append(
                    SourceBreakUpType(
                        source=sourceMap[b['source_id']],
                        count=b['count']
                    )
                )
        return data

    @strawberry.field
    def test_rates_yearly(self, info) -> Optional[JSONScalar]:
        counts = self['qs'].annotate(year=F('timestamp__year')).values('year').annotate(
            count=Count('*')
        ).values('year', 'count')
        data = {}
        for d in counts:
            data[d['year']] = d['count']
        return data

    @strawberry.field
    def contamination(self) -> ContaminationStat:
        return {
            'qs': self['qs'],
            'total': self['qs'].count()
        }

    @strawberry.field
    def avg(self, info) -> Optional[List[ParameterStatType]]:
        from sample.models import Parameter
        params = Parameter.objects.all()
        data = []
        for p in params:
            data.append(
                ParameterStatType(
                    parameter=p,
                    value=(
                        self['qs'].filter(
                            parameter=p,
                        ).aggregate(avg=Avg('value'))['avg']
                    )
                )
            )
        return data


@strawberry.type
class SearchResult:
    title: str
    slug: str
    type: str


__all__ = [
    'WQIType',
    'StatGeneratorType',
    'ContaminationStat',
    'SearchResult'
]

