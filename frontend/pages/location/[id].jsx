import React, {useEffect, useState} from "react";
import APIFetch from "../../src/utils/APIFetch";
import LocationPageView from "../../src/location/page";

export async function getServerSideProps({ query }) {
    return {
        props: { id: query?.id }
    }
}

const LocationPage = ({ id }) => {

    const [location, setLocation] = useState();

    const fetchData = () => {
        APIFetch({
            query: `query ($id: ID!) {
              location(id: $id) {
                id
                name
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
            variables: { id }
        }).then(({ success, data, response }) => {
            if(success && data?.location) {
                setLocation(data.location)
            }
        })
    };

    useEffect(fetchData, []);

    return location ? <LocationPageView location={location} /> : <div>Loading</div>;

};

export default LocationPage;