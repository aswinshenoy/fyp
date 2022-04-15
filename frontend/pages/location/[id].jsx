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
            stats {
               wqi {
                  value
                  group
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
        <LocationPageView location={location} />
    </AppView>
);

export default LocationPage;