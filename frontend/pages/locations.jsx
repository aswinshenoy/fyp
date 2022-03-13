import React, {useEffect, useState} from "react";
import APIFetch from "../src/utils/APIFetch";
import LocationsListingView from "../src/location/listing";


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

    return locations ? <LocationsListingView locations={locations} /> : <div>Loading</div>;

};

export default LocationsPage;