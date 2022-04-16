import React from "react";
import APIFetch from "../../src/utils/APIFetch";
import AppView from "../../src/app";
import DistrictPageView from "../../src/district/page";

export async function getServerSideProps({ query }) {
    return APIFetch({
        query: `query ($slug: String!) {
          district(slug: $slug) {
            id
            name
            slug
            state {
              id
              slug
              name
            }
            locations {
              id
              name
              wqi {
                group
                value
              }
            }
            stats {
              wqi {
                  value
                  group
              }
              contamination {
                  physical {
                    value
                    percent
                  }
                  chemical {
                    value
                    percent
                  }
                  biological {
                    value
                    percent
                  }
                }
              avg {
                parameter {
                  slug
                  name
                  group{
                    slug
                  }
                }
                value
              }
            }
          }
        }`,
        variables: { slug: query?.slug }
    }).then(({ success, data, response }) => {
        if(success && data?.district) {
            return {
                props: {
                    district: data.district
                }
            }
        } else {
            return {
                props: {
                    notFound: true
                }
            }
        }
    })
}

const DistrictPage = ({ district }) => (
    <AppView meta={{ title: `${district?.name} - District Water Statistics` }}>
        {district ? <DistrictPageView district={district} /> : <div>Not Found</div>}
    </AppView>
);

export default DistrictPage;