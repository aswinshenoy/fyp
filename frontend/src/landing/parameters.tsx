import React, { useEffect, useState } from "react";
import Link from "next/link";
import {Card} from "@traboda/dsr";
import APIFetch from "../utils/APIFetch";

const ParameterList = () => {

    const [parameters, setParameters] = useState([]);

    const fetchParameter = () => {
        APIFetch({
            query: `{
              parameters{
                id
                name
                slug
                group{
                  name
                  slug
                }
              }
            }`,
        }).then(({ success, data }) => {
            if (success && data?.parameters) {
                setParameters(data.parameters);
            }
        });
    };

    useEffect(fetchParameter, []);

    return (
        <div className="py-2">
            <div className="px-4 text-2xl font-semibold">
                Parameters
            </div>
            <div className="flex flex-wrap p-2">
                {parameters.map((m) => (
                    <div className="w-1/2 p-2">
                        <Link href={`/parameter/${m?.slug}`}>
                            <a>
                                <Card className="bg-white shadow-lg hover:shadow-md p-4">
                                    <div className="text-2xl font-semibold">
                                        {m?.name}
                                    </div>
                                    <div>
                                        {m?.group?.name}
                                    </div>
                                </Card>
                            </a>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default ParameterList;