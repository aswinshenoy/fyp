import React from "react";
import APIFetch from "../../src/utils/APIFetch";
import LocationPageView from "../../src/location/page";
import AppView from "../../src/app";

export async function getServerSideProps({ query }) {
    return APIFetch({
        query: `query ($id: ID!) {
          location(id: $id) {
            id
            name
            district {
              id
              slug
              name
            }
            state {
              id
              slug
              name
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
                  sources
                  treatments
                  issues
                  minValue
                  maxValue
                  healthHazards
                  group{
                    slug
                  }
                }
                value
              }
            }
          }
        }`,
        variables: { id: query?.id }
    }).then(({ success, data, response }) => {
        if(success && data?.location) {
            return {
                props: {
                    location: data.location
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

const LocationPage = ({ location }) => (
    <AppView meta={{ title: `${location?.name} - Panchayath Water Statistics` }}>
        {location ? <LocationPageView location={location} /> : <div>Not Found</div>}
    </AppView>
);

export default LocationPage;