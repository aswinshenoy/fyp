import json
import strawberry
from typing import Any, NewType


JSONScalar = strawberry.scalar(
    NewType("JSONScalar", Any),
    serialize=lambda v: v,
    parse_value=lambda v: json.loads(v),
    description="The GenericScalar scalar type represents a generic GraphQL scalar value that could be: List or Object."
)

__all__ = [
    'JSONScalar'
]
