import React from "react";
import DistrictPageHeader from "./header";
import MetricView from "../../location/page/metrics";
import {TabSwitcher} from "@traboda/dsr";
import LocationsListingView from "../../location/listing";

const DistrictPageView = ({ district }) => (
    <div className="bg-gray-100 p-3">
        <div className="flex justify-center py-4">
            <div style={{ width: '1500px', maxWidth: '100%' }}>
                <div className="p-2">
                    <DistrictPageHeader district={district} />
                </div>
                {/*<div className="p-2">*/}
                {/*    <Contamination location={location} />*/}
                {/*</div>*/}
                <TabSwitcher
                    isVertical
                    items={[
                        {
                            label: 'Parameters',
                            key: 'parameters',
                            rendererFunc: () => (
                                <div className="flex text-center flex-wrap">
                                    <MetricView location={district} />
                                </div>
                            )
                        },
                        {
                            label: 'Panchyats',
                            key: 'panchyats',
                            rendererFunc: () => (
                                <div>
                                    <LocationsListingView locations={district?.locations} />
                                </div>
                            )
                        }
                    ]}
                />
            </div>
        </div>
    </div>
);

export default DistrictPageView;