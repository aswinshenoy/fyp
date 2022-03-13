import React from "react";
import {Card} from "@traboda/dsr";
import Link from "next/link";

const LocationsListingView = ({ locations}) => {

    return (
        <div>
            {locations?.length > 0 && (
                <div className="flex flex-wrap p-2">
                    {locations.map((l) => (
                        <div className="w-1/4 p-2">
                            <Link passHref href={`/location/${l.id}`}>
                                <a className="block">
                                    <Card className="flex flex-wrap w-full p-2">
                                        <div className="w-2/3 p-2">
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