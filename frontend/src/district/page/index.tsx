import React from "react";
import DistrictPageHeader from "./header";
import MetricView from "../../location/page/metrics";
import {TabSwitcher} from "@traboda/dsr";
import LocationsListingView from "../../location/listing";
import Contamination from "../../location/page/contamination";
import DistrictTestStats from "./TestStats";
import DistrictYearlyTrends from "./YearlyTrends";

const DistrictPageView = ({ district }) => (
    <div className="bg-gray-100 p-3">
        <div className="flex justify-center py-4">
            <div style={{ width: '1500px', maxWidth: '100%' }}>
                <div className="p-2">
                    <DistrictPageHeader district={district} />
                </div>
                <div className="p-2">
                    <Contamination contamination={district?.stats?.contamination} />
                </div>
                <TabSwitcher
                    isVertical
                    items={[
                        {
                            label: 'Avg Values',
                            key: 'parameters',
                            rendererFunc: () => (
                                <div className="flex text-center flex-wrap">
                                    <MetricView districtID={district?.id} location={district} />
                                </div>
                            )
                        },
                        {
                            label: 'Yearly Trends',
                            key: 'trends',
                            rendererFunc: () => (
                                <div className="flex text-center flex-wrap">
                                    <DistrictYearlyTrends districtID={district?.id} />
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
                        },
                        {
                            label: 'Test Stats',
                            key: 'test-stats',
                            rendererFunc: () => (
                                <div>
                                    <DistrictTestStats districtID={district?.id} />
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