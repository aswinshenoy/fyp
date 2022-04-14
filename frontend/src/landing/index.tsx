import React from 'react';
import ParameterList from "./parameters";

const LandingPageView = () => {

    return (
        <div>
            <div className="flex flex-wrap mx-0">
                <div className="w-2/3 p-2">
                    <h1>Hello</h1>
                </div>
                <div className="w-1/3 p-2">
                    <ParameterList />
                </div>
            </div>

        </div>
    )

};

export default LandingPageView;