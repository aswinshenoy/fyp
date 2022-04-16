import React from "react";
import {Card} from "@traboda/dsr";

const Contamination = ({ contamination }) => {

    const _round = (value) => (Math.round((value + Number.EPSILON) * 100) / 100);

    return contamination ? (
        <div className="flex flex-wrap">
            <div className="w-1/3 p-2">
                <Card className="bg-white">
                    <div className="text-xl">
                        Physical Contamination
                    </div>
                    <div className="text-5xl py-3 font-semibold">
                        {_round(contamination.physical?.percent)}%
                    </div>
                    <div className="text-lg">
                        {contamination.physical?.value} samples
                    </div>
                </Card>
            </div>
            <div className="w-1/3 p-2">
                <Card className="bg-white">
                    <div className="text-xl">
                        Chemical Contamination
                    </div>
                    <div className="text-5xl py-3 font-semibold">
                        {_round(contamination.chemical?.percent)}%
                    </div>
                    <div className="text-lg">
                        {contamination.chemical?.value} samples
                    </div>
                </Card>
            </div>
            <div className="w-1/3 p-2">
                <Card className="bg-white">
                    <div className="text-xl">
                        Biological Contamination
                    </div>
                    <div className="text-5xl py-3 font-semibold">
                        {_round(contamination.biological?.percent)}%
                    </div>
                    <div className="text-lg">
                        {contamination.biological?.value} samples
                    </div>
                </Card>
            </div>
        </div>
    ) : (<div />);
};

export default Contamination;