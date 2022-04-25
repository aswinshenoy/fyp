import React from 'react';
import {Card} from "@traboda/dsr";

const ParameterMeta = ({ sources, healthHazards, issues, treatments }) => {

    return (
        <div className="flex flex-wrap mx-0">
            <div className="w-1/4 p-2">
                <Card className="bg-white">
                    <div className="text-lg font-semibold">Sources</div>
                    {(sources && sources?.length > 0) && (
                        <ul>
                            {sources.map((s) => (
                                <li>{s}</li>
                            ))}
                        </ul>
                    )}
                </Card>
            </div>
            <div className="w-1/4 p-2">
                <Card className="bg-white">
                    <div className="text-lg font-semibold">Issues</div>
                    {(issues && issues?.length > 0) && (
                        <ul>
                            {issues.map((s) => (
                                <li>{s}</li>
                            ))}
                        </ul>
                    )}
                </Card>
            </div>
            <div className="w-1/4 p-2">
                <Card className="bg-white">
                    <div className="text-lg font-semibold">Health Hazards</div>
                    {(healthHazards && healthHazards?.length > 0) && (
                        <ul>
                            {healthHazards.map((s) => (
                                <li>{s}</li>
                            ))}
                        </ul>
                    )}
                </Card>
            </div>
            <div className="w-1/4 p-2">
                <Card className="bg-white">
                    <div className="text-lg font-semibold">Treatments</div>
                    {(treatments && treatments?.length > 0) && (
                        <ul>
                            {treatments.map((s) => (
                                <li>{s}</li>
                            ))}
                        </ul>
                    )}
                </Card>
            </div>

        </div>
    )

};

export default ParameterMeta;