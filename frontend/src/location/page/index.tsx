import React from "react";
import LocationPageHeader from "./header";
import MetricView from "./metrics";
import Contamination from "./contamination";

const LocationPageView = ({ location }) => {

    return (
        <div className="bg-gray-100 p-3">
            <div className="flex justify-center py-4">
                <div style={{ width: '1200px', maxWidth: '100%' }}>
                    <div className="p-2">
                        <LocationPageHeader location={location} />
                    </div>
                    <div className="p-2">
                        <Contamination location={location} />
                    </div>
                    <div className="flex text-center flex-wrap">
                       <MetricView location={location} />
                    </div>
                </div>
            </div>
        </div>
    )

};

export default LocationPageView;