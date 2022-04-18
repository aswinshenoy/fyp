import React, {useState} from "react";
import {SearchBox, SimpleSelect, TagSelector} from "@traboda/dsr";
import DistrictFilter from "./DistrictFilter";
import StateFilter from "./StateFilter";

const ParameterPageHeader = ({
    sourceID, setSourceID, district, setDistrict, state, setState, sources, years, setYear, year, level, setLevel
}) => {

    const [keyword, setKeyword] = useState('');

    return (
        <div className="bg-blue-50 flex flex-wrap p-2">
            <div className="w-1/8 flex items-end">
                <div>
                    <div className="text-sm ml-2">
                        Search
                    </div>
                    <SearchBox hideLabel keyword={keyword} setKeyword={setKeyword} />
                </div>
            </div>
            <div className="w-1/8 px-2 flex justify-end items-end">
                <div>{level === 'panchayat' ? (
                        <DistrictFilter
                            district={district}
                            setDistrict={setDistrict}
                        />
                    ) : level === 'district' ? (
                        <StateFilter
                            state={state}
                            setState={setState}
                        />
                    ) : (<div />)
                }</div>
            </div>
            <div className="w-1/8 px-2 flex justify-end items-end">
                <div>
                    <div className="text-sm ml-2">
                        Filter by Source Type
                    </div>
                    <div style={{ width: '150px', maxWidth: '100%' }}>
                        <SimpleSelect
                            name="source"
                            value={sourceID}
                            labels={{
                                placeholder: "Select a Source",
                            }}
                            onChange={(source) => setSourceID(source)}
                            required
                            options={[
                                {
                                    label: 'All Sources',
                                    value: -1
                                },
                                ...sources.map(s => ({
                                    label: s.name,
                                    value: s.id
                                }))
                            ]}
                        />
                    </div>
                </div>
            </div>
            <div className="w-1/8 px-2 flex justify-end items-end">
                <div>
                    <div className="text-sm ml-2">
                        Filter by Year
                    </div>
                    <div style={{ width: '150px', maxWidth: '100%' }}>
                        <SimpleSelect
                            name="year"
                            value={year}
                            labels={{
                                placeholder: "Select an Year",
                            }}
                            onChange={(year) => setYear(year)}
                            required
                            options={[
                                {
                                    label: 'All Years',
                                    value: null
                                },
                                ...years.map(year => ({
                                    label: year,
                                    value: year.toString()
                                }))
                            ]}
                        />
                    </div>
                </div>
            </div>
            <div className="w-1/4 px-2 flex justify-end items-end">
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
    )

};

export default ParameterPageHeader;