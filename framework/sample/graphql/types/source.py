import strawberry


@strawberry.type
class BasicTestSourceType:
    id: strawberry.ID
    name: str
    slug: str


__all__ = [
    'BasicTestSourceType'
]
