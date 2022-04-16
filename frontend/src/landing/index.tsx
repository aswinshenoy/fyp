import React from 'react';
import ParameterList from "./parameters";
import StatsOverview from "./stats";

const LandingPageView = () => {

    return (
        <div>
            <div className="flex flex-wrap mx-0">
                <div className="w-1/2 p-2">
                    <StatsOverview />
                </div>
                <div className="w-1/2 p-2">
                    <ParameterList />
                </div>
            </div>

        </div>
    )

};

export default LandingPageView;