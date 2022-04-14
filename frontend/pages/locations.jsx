import React, {useEffect, useState} from "react";
import APIFetch from "../src/utils/APIFetch";
import LocationsListingView from "../src/location/listing";
import AppView from "../src/app";


const LocationsPage = () => {

    const [locations, setLocations] = useState();

    const fetchData = () => {
        APIFetch({
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
                setLocations(data.locations)
            }
        })
    };

    useEffect(fetchData, []);

    return (
        <AppView meta={{ title: 'Locations' }}>
            {locations ? <LocationsListingView locations={locations} /> : <div>Loading</div>}
        </AppView>
    );

};

export default LocationsPage;