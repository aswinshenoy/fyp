from typing import Optional, List

import strawberry
from django.db.models import Avg, Min, Max, Count, F


@strawberry.type
class BasicParameterGroupType:
    id: strawberry.ID
    name: str
    slug: str


@strawberry.type
class BasicParameterType:
    id: strawberry.ID
    name: str
    slug: str
    maxValue: float
    minValue: float
    group: Optional[BasicParameterGroupType]


@strawberry.type
class ParameterType(BasicParameterType):

    @strawberry.field
    def locations(
        self, info,
        level: Optional[str] = 'panchayat',
        year: Optional[str] = None,
        isAsc: Optional[bool] = False, count: Optional[int] = 50
    ) -> List[Optional[strawberry.LazyType["LocationStat", "sample.graphql.types.location"]]]:
        from sample.models import Location, State, District, TestRecord
        qs = TestRecord.objects.filter(parameter=self)
        if year is not None:
            qs = qs.filter(timestamp__year=year)
        if level == 'panchayat':
            qs = qs.values('location').annotate(
                locationID=F('location_id')
            )
        elif level == 'district':
            qs = qs.values('location__district').annotate(
                locationID=F('location__district_id')
            )
        elif level == 'state':
            qs = qs.values('location__district__state').annotate(
                locationID=F('location__district__state_id')
            )
        qs = qs.annotate(
            avg=Avg('value'),
            min=Min('value'),
            max=Max('value'),
            samples=Count('id'),
        ).values('locationID', 'avg', 'min', 'max', 'samples').order_by(
            'avg' if isAsc else '-avg',
        )[:count]

        lsMap = {}
        locationIDs = []
        for l in qs:
            locationIDs.append(l['locationID'])
        if level == 'panchayat':
            ls = Location.objects.filter(id__in=locationIDs)
        elif level == 'state':
            ls = State.objects.filter(id__in=locationIDs)
        elif level == 'district':
            ls = District.objects.filter(id__in=locationIDs)
        for l in ls:
            lsMap[l.id] = l

        data = []
        rank = 0
        from .location import LocationStat
        for q in qs:
            rank += 1
            data.append(LocationStat(
                rank=rank,
                location=lsMap[q['locationID']],
                value=q['avg'],
                minValue=q['min'],
                maxValue=q['max'],
                samples=q['samples']
            ))
        return data


@strawberry.type
class ParameterStatType:
    parameter: BasicParameterType
    value: Optional[float] = None


__all__ = [
    'BasicParameterType',
    'ParameterType',
    'ParameterStatType',
]
