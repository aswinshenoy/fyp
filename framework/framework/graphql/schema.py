
import strawberry
from strawberry.tools import merge_types

from sample.graphql import SampleManagementMutations, SampleQueries

Mutations = merge_types('Mutations', (
    SampleManagementMutations,
))
Query = merge_types('Queries', (
    SampleQueries,
))


schema = strawberry.Schema(
    query=Query,
    mutation=Mutations,
    # extensions=[
    #     JSONWebTokenMiddleware
    # ]
)
