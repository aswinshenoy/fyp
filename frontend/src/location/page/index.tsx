import React from "react";
import LocationPageHeader from "./header";
import MetricView from "./metrics";
import Contamination from "./contamination";
import {TabSwitcher} from "@traboda/dsr";
import YearlyTrends from "./yearly";

const LocationPageView = ({ location }) => (
    <div className="p-3">
        <div className="flex justify-center py-4">
            <div style={{ width: '1333px', maxWidth: '100%' }}>
                <div className="p-2">
                    <LocationPageHeader location={location} />
                </div>
                <div className="p-2">
                    <Contamination location={location} />
                </div>
            </div>
        </div>
        <TabSwitcher
            isVertical
            items={[
                {
                    label: 'Average Values',
                    key: 'parameter_avg',
                    rendererFunc: () => (
                        <div className="flex text-center flex-wrap">
                           <MetricView location={location} />
                        </div>
                    )
                },
                {
                    label: 'Yearly Trends',
                    key: 'parameter_trend',
                    rendererFunc: () => (
                        <div>
                            <YearlyTrends locationID={location?.id} />
                        </div>
                    ),
                }
            ]}
        />
    </div>
);

export default LocationPageView;