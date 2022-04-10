import React from 'react';
import { Breadcrumbs, Anchor } from '@mantine/core';
import { Title } from '@mantine/core';


const LocationPageHeader = ({ location }) => {

    return (
        <React.Fragment>
            <div className="mb-2">
                <Breadcrumbs>
                    <Anchor href={`/`}>
                        Home
                    </Anchor>
                    <Anchor href={`/states/${location?.state}`}>
                        {location?.state}
                    </Anchor>
                    <Anchor href={`/districts/${location?.district}`}>
                        {location?.district}
                    </Anchor>
                </Breadcrumbs>
            </div>
            <div className="bg-blue-600 text-white p-3 rounded">
                <div className="flex flex-wrap">
                    <div className="w-2/3 flex items-center px-1">
                        <div>
                            <Title order={1}>{location?.name}</Title>
                        </div>
                    </div>
                    <div className="w-1/3 p-1 justify-end text-right flex">
                        <div>
                            <div>
                                <div className="text-lg font-semibold">Water Quality Index (WQI)</div>
                                <div className="text-3xl font-bold">{Math.round(location?.avgMetrics?.wqi?.value)}/900</div>
                                <div>{location?.avgMetrics?.wqi?.group}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default LocationPageHeader;