import React from "react";
import {DataTable, PageHeader} from "@traboda/dsr";

const ParameterPageView = ({ parameter }) => {

    return (
        <div>
            <PageHeader
                breadcrumbItems={[
                    {
                        title: "Parameters",
                        link: "/parameters"
                    },
                    {
                        title: parameter.name,
                        link: `/parameter/${parameter.name.toLowerCase()}`
                    }
                ]}
                title={parameter.name}
            />
            <div>
                <DataTable
                    properties={[
                        {
                            label: 'Rank',
                            id: 'rank',
                            value: (parameter) => parameter.rank,
                            space: '1'
                        },
                        {
                            label: 'Location',
                            id: 'location',
                            link: (parameter) => `/location/${parameter?.location.id}`,
                            value: (parameter) => parameter.location?.name,
                            space: '4'
                        },
                        {
                            label: 'Avg. Value',
                            id: 'avgValue',
                            value: (parameter) => parameter.value,
                            space: '2'
                        },
                        {
                            label: 'Max. Value',
                            id: 'maxValue',
                            value: (parameter) => parameter.maxValue,
                            space: '2'
                        },
                        {
                            label: 'Min. Value',
                            id: 'minValue',
                            value: (parameter) => parameter.minValue,
                            space: '2'
                        },
                        {
                            label: 'Samples',
                            id: 'samples',
                            value: (parameter) => parameter.samples,
                            space: '2'
                        }
                    ]}
                    items={parameter.locations}
                />
            </div>
        </div>
    )

};

export default ParameterPageView;