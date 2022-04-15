from typing import Optional

import strawberry


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
class ParameterStatType:
    parameter: BasicParameterType
    value: Optional[float] = None


__all__ = [
    'BasicParameterType',
    'ParameterStatType',
]
