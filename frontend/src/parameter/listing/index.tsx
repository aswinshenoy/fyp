import React from "react";
import {Card} from "@traboda/dsr";
import Link from "next/link";

const ParametersListingView = ({ parameters }) => {

    return (
        <div>
            {parameters?.length > 0 && (
                <div className="flex flex-wrap p-2">
                    {parameters.map((l) => (
                        <div className="w-1/4 p-2">
                            <Link passHref href={`/parameter/${l.slug}`}>
                                <a className="block">
                                    <Card className="bg-white w-full p-2">
                                        <h3 className="font-semibold text-xl">{l.name}</h3>
                                        <div>
                                            {l.group?.name}
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

export default ParametersListingView;