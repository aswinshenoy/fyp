import React from 'react';
import {Breadcrumb} from "@traboda/dsr";


const LocationPageHeader = ({ location }) => (
    <React.Fragment>
        <div className="mb-2">
            <Breadcrumb
                items={[
                    {
                        link: `/state/${location?.state.slug}`,
                        title: location?.state.name
                    },
                    {
                        link: `/district/${location?.district.slug}`,
                        title: location?.district.name
                    },
                    {
                        link: `/location/${location?.id}`,
                        title: location?.name,
                        isActive: true
                    }
                ]}
            />
        </div>
        <div className="bg-blue-600 text-white p-3 rounded">
            <div className="flex flex-wrap">
                <div className="w-2/3 flex items-center px-1">
                    <div>
                        <h1 className="text-6xl font-semibold">{location?.name}</h1>
                    </div>
                </div>
                <div className="w-1/3 p-1 justify-end text-right flex">
                    <div>
                        <div>
                            <div className="text-lg font-semibold">Water Quality Index (WQI)</div>
                            <div className="text-6xl font-bold">{Math.round(location?.stats?.wqi?.value)}/900</div>
                            <div>{location?.stats?.wqi?.group}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
);

export default LocationPageHeader;