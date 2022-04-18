import React from "react";
import APIFetch from "../src/utils/APIFetch";
import LocationsListingView from "../src/location/listing";
import AppView from "../src/app";


export async function getServerSideProps({ query }) {
    return APIFetch({
        query: `{
          locations{
            id
            name
            wqi{
              group
              value
            }
          }
        }`,
    }).then(({ success, data, response }) => {
        if(success && data?.locations) {
            return {
                props: {
                    locations: data.locations
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


const LocationsPage = ({ locations }) => (
    <AppView meta={{ title: 'Locations' }}>
        <LocationsListingView locations={locations} />
    </AppView>
);

export default LocationsPage;