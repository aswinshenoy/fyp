
import strawberry
from strawberry.tools import merge_types

from sample.graphql import SampleManagementMutations, SampleManagementQueries

Mutations = merge_types('Mutations', (
    SampleManagementMutations,
))
Query = merge_types('Queries', (
    SampleManagementQueries,
))


schema = strawberry.Schema(
    query=Query,
    mutation=Mutations,
    # extensions=[
    #     JSONWebTokenMiddleware
    # ]
)
