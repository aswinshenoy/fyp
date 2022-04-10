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
                district
                state
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
                avgMetrics {
                  manganese
                  iron
                  nitrate
                  arsenic
                  fluoride
                  chloride
                  sulphate
                  copper
                  tds
                  ph
                  hardness
                  alkalinity
                  turbidity
                  ecoil
                  coliform
                  wqi {
                    value
                    group
                  }
                }
                yearlyWqi {
                  year
                  wqi {
                    value
                    group
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
    <AppView>
        <LocationPageView location={location} />
    </AppView>
);

export default LocationPage;