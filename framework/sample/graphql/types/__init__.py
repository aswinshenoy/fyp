import strawberry
from typing import List, Optional

from django.db.models import Avg, Min, Max, Count, F

from .shared import WQIType, WaterParameters
from .district import DistrictType
from .location import LocationType, BasicLocationType


@strawberry.type
class YearlyValueType:

    @strawberry.field
    def value(self) -> float:
        return self['value']

    @strawberry.field
    def year(self) -> int:
        return self['year']


@strawberry.type
class YearlyWQIType:

    @strawberry.field
    def wqi(self) -> WQIType:
        return self['wqi']

    @strawberry.field
    def year(self) -> int:
        return self['year']


@strawberry.type
class LocationStat:
    rank: int
    location: BasicLocationType
    value: float
    maxValue: float
    minValue: float
    samples: int


@strawberry.type
class Parameter:
    id: strawberry.ID
    name: str
    slug: str

    @strawberry.field
    def locations(
        self, info,
        level: Optional[str] = 'panchayat',
        year: Optional[str] = None,
        isAsc: Optional[bool] = False, count: Optional[int] = 50
    ) -> List[LocationStat]:
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


__all__ = [
    'DistrictType',
    'BasicLocationType',
    'LocationType',
    'LocationStat',
    'Parameter'
]
