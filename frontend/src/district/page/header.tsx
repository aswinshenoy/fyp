import React from 'react';
import {Breadcrumb} from "@traboda/dsr";


const DistrictPageHeader = ({ district }) => (
    <React.Fragment>
        <div className="mb-2">
            <Breadcrumb
                items={[
                    {
                        link: `/state/${district?.state?.slug}`,
                        title: district?.state?.name
                    },
                    {
                        link: `/district/${district?.slug}`,
                        title: district?.name,
                        isActive: true
                    }
                ]}
            />
        </div>
        <div className="bg-blue-600 text-white p-3 rounded">
            <div className="flex flex-wrap">
                <div className="w-2/3 flex items-center px-1">
                    <div>
                        <h1 className="text-6xl font-semibold">{district?.name}</h1>
                    </div>
                </div>
                <div className="w-1/3 p-1 justify-end text-right flex">
                    <div>
                        <div>
                            <div className="text-lg font-semibold">Water Quality Index (WQI)</div>
                            <div className="text-6xl font-bold">{Math.round(district?.stats?.wqi?.value)}/900</div>
                            <div>{district?.stats?.wqi?.group}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
);

export default DistrictPageHeader;