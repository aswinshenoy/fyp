import React, {useState} from "react";
import {Card, SearchBox} from "@traboda/dsr";
import Link from "next/link";

const LocationsListingView = ({ locations}) => {

    const [keyword, setKeyword] = useState("");

    return (
        <div>
            <div className="flex flex-wrap px-2 mx-0">
                <div className="w-1/2 px-2 flex items-end">
                    <div className="text-2xl font-semibold">
                        Panchayats ({locations?.length})
                    </div>
                </div>
                <div className="w-1/2 flex justify-end items-end px-2">
                    <div>
                        <div style={{ width: '220px', maxWidth: '100%' }}>
                            <SearchBox hideLabel keyword={keyword} setKeyword={setKeyword} onSearch={() => {}} />
                        </div>
                    </div>
                </div>
            </div>
            {locations?.length > 0 && (
                <div className="flex flex-wrap p-2">
                    {locations.filter((l) => (keyword?.length < 1) || (l.name.toLowerCase().startsWith(keyword.toLowerCase()))).map((l) => (
                        <div className="w-1/4 p-2">
                            <Link passHref href={`/location/${l.id}`}>
                                <a className="block">
                                    <Card className="flex shadow-lg hover:shadow-sm bg-white flex-wrap w-full p-2">
                                        <div className="w-2/3 overflow-hidden p-2">
                                            <h3 className="font-semibold text-xl">{l.name}</h3>
                                        </div>
                                        <div className="w-1/3 flex justify-end text-right p-1">
                                            <div>
                                                <div className="font-semibold text-xl">{Math.round(l.wqi.value)}/900</div>
                                                <div className="text-lg">{l.wqi.group}</div>
                                            </div>
                                        </div>
                                    </Card>
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

};

export default LocationsListingView;