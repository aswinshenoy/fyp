from typing import Optional, List

import strawberry
from django.db.models import Avg, Q

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
class WaterParameters:
    manganese: float
    iron: float
    nitrate: float
    arsenic: float
    fluoride: float
    chloride: float
    sulphate: float
    copper: float
    tds: float
    ph: float
    hardness: float
    alkalinity: float
    turbidity: float
    wqi: WQIType
    ecoil: float
    coliform: float


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
            percent=(count/self['total'])*100
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
            percent=(count / self['total']) * 100
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
            percent=(count / self['total']) * 100
        )


@strawberry.type
class StatGeneratorType:

    @strawberry.field
    def wqi(self, info) -> Optional[WQIType]:
        return self['qs'].filter(parameter__slug='wqi').aggregate(wqi=Avg("value"))['wqi']

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
    'WaterParameters',
    'StatGeneratorType',
    'ContaminationStat',
    'SearchResult'
]

