import React, {useEffect, useState} from "react";
import { DataTable, PageHeader } from "@traboda/dsr";

import APIFetch from '../../utils/APIFetch';
import ParameterPageHeader from "./header";

const ParameterPageView = ({ districtID, years, sources, parameter: _parameter }) => {

    const [level, setLevel] = useState('panchayat');
    const [year, setYear] = useState(null);
    const [state, setState] = useState(null);
    const [district, setDistrict] = useState(null);
    const [sourceID, setSourceID] = useState<string|number>(-1);
    const [parameter, setParameter] = useState(_parameter);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if(districtID) {
            APIFetch({
                query: `query ($districtID: ID) {
              district(id: $districtID) {
                label: name
                value: id
                id
                slug
              }
            }`,
                variables: { districtID }
            }).then(({ data, success }) => {
                if(success && data?.district){
                    setDistrict(data.district);
                }
            })
        }
    }, [districtID])

    const fetchData = () => {
        setLoading(true);
        APIFetch({
            query: `query ($slug: String!, $level: String, $year: String, $sourceID: ID, $districtID: ID, $stateID: ID) {
              parameter(slug: $slug) {
                name
                slug
                id
                locations(level: $level, year: $year, sourceID: $sourceID, districtID: $districtID, stateID: $stateID) {
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
            variables: {
                slug: parameter.slug, level, year,
                sourceID: sourceID != -1 ? sourceID : null,
                districtID: district?.id ? district?.id : null,
                stateID: state?.id ? state?.id : null,
            }
        }).then(({ success, data, response }) => {
            setLoading(false)
            if (success && data?.parameter) {
                setParameter(data.parameter);
            }
        });
    }

    useEffect(fetchData, [level, year, sourceID, district, state]);


    return (
        <div>
            <PageHeader
                breadcrumbItems={[
                    {
                        title: "Parameters",
                        link: "/parameters"
                    },
                    {
                        title: parameter?.name,
                        link: `/parameter/${parameter?.slug}`
                    }
                ]}
                title={parameter?.name}
            />
            <div>
                <ParameterPageHeader
                    state={state}
                    setState={setState}
                    district={district}
                    setDistrict={setDistrict}
                    years={years}
                    sources={sources}
                    year={year}
                    setYear={setYear}
                    sourceID={sourceID}
                    setSourceID={setSourceID}
                    level={level}
                    setLevel={setLevel}
                />
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