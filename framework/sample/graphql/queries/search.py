import strawberry
from typing import Optional, List

from sample.graphql.types.shared import SearchResult
from sample.models import Location, District, State, Parameter


@strawberry.type
class SearchQueries:

    @strawberry.field
    def search(self, info, keyword: str) -> Optional[List[SearchResult]]:
        results = []
        if len(keyword) < 2:
            return results
        locations = Location.objects.filter(
            name__istartswith=keyword
        )[:5]
        for l in locations:
            results.append(
                SearchResult(
                    title=l.name,
                    slug=str(l.id),
                    type='location'
                )
            )
        if len(results) < 5:
            districts = District.objects.filter(
                name__istartswith=keyword
            )[:5]
            for d in districts:
                results.append(
                    SearchResult(
                        title=d.name,
                        slug=d.slug,
                        type='district'
                    )
                )
        if len(results) < 5:
            districts = State.objects.filter(
                name__istartswith=keyword
            )[:5]
            for d in districts:
                results.append(
                    SearchResult(
                        title=d.name,
                        slug=d.slug,
                        type='state'
                    )
                )
        if len(results) < 5:
            parameters = Parameter.objects.filter(
                name__istartswith=keyword
            )[:5]
            for d in parameters:
                results.append(
                    SearchResult(
                        title=d.name,
                        slug=d.slug,
                        type='parameter'
                    )
                )
        return results


__all__ = [
    'SearchQueries'
]
