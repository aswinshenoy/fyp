import React from "react";
import {Card} from "@mantine/core";

const Contamination = ({ location }) => {

    const _round = (value) => (Math.round((value + Number.EPSILON) * 100) / 100);

    return (
        <div className="flex flex-wrap">
            <div className="w-1/3 p-2">
                <Card>
                    <div className="text-xl">
                        Physical Contamination
                    </div>
                    <div className="text-5xl py-3 font-semibold">
                        {_round(location.contamination.physical?.percent)}%
                    </div>
                    <div className="text-lg">
                        {location.contamination.physical?.value} samples
                    </div>
                </Card>
            </div>
            <div className="w-1/3 p-2">
                <Card>
                    <div className="text-xl">
                        Chemical Contamination
                    </div>
                    <div className="text-5xl py-3 font-semibold">
                        {_round(location.contamination.chemical?.percent)}%
                    </div>
                    <div className="text-lg">
                        {location.contamination.chemical?.value} samples
                    </div>
                </Card>
            </div>
            <div className="w-1/3 p-2">
                <Card>
                    <div className="text-xl">
                        Biological Contamination
                    </div>
                    <div className="text-5xl py-3 font-semibold">
                        {_round(location.contamination.biological?.percent)}%
                    </div>
                    <div className="text-lg">
                        {location.contamination.biological?.value} samples
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Contamination;