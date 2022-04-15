import React, {useEffect, useState} from "react";
import {DataTable, PageHeader, SimpleSelect, TagSelector} from "@traboda/dsr";

import APIFetch from '../../utils/APIFetch';

const ParameterPageView = ({ years, parameter: _parameter }) => {

    const [level, setLevel] = useState('panchayat');
    const [year, setYear] = useState(null);
    const [parameter, setParameter] = useState(_parameter);
    const [isLoading, setLoading] = useState(false);

    const fetchData = () => {
        setLoading(true);
        APIFetch({
            query: `query ($slug: String!, $level: String, $year: String) {
              parameter(slug: $slug) {
                name
                slug
                id
                locations(level: $level, year: $year){
                    rank
                    location {
                      name
                      type
                      id
                    }
                    value
                    minValue
                    maxValue
                    samples
                }
              }
            }`,
            variables: { slug: parameter.slug, level, year }
        }).then(({ success, data, response }) => {
            setLoading(false)
            if (success && data?.parameter) {
                setParameter(data.parameter);
            }
        });
    }

    useEffect(fetchData, [level, year]);


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
                        link: `/parameter/${parameter.slug}`
                    }
                ]}
                title={parameter.name}
            />
            <div>
                <div className="flex flex-wrap p-2">
                    <div className="w-1/2">

                    </div>
                    <div className="w-1/4 px-2 flex justify-end">
                        <div>
                            <div className="text-sm ml-2">
                                Group by Year
                            </div>
                            <div style={{ width: '150px', maxWidth: '100%' }}>
                                <SimpleSelect
                                    name="year"
                                    value={year}
                                    labels={{
                                        placeholder: "All Years",
                                    }}
                                    onChange={(year) => setYear(year)}
                                    options={[
                                        ...years.map(year => ({
                                            label: year,
                                            value: year.toString()
                                        }))
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-1/4 px-2 flex justify-end">
                        <div>
                            <div className="text-sm ml-2">
                                Group by Location
                            </div>
                            <TagSelector
                                value={level}
                                onChange={(level) => setLevel(level?.value)}
                                options={[
                                    {
                                        label: "Panchayat",
                                        value: "panchayat"
                                    },
                                    {
                                        label: "District",
                                        value: "district"
                                    },
                                    {
                                        label: "State",
                                        value: "state"
                                    }
                                ]}
                            />
                        </div>
                    </div>
                </div>
                <DataTable
                    isLoading={isLoading}
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
                            link: (parameter) => `/${parameter?.location.type}/${parameter?.location.id}`,
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