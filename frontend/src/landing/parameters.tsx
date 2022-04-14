import React from "react";
import Link from "next/link";
import {Card} from "@traboda/dsr";

const ParameterList = () => {


    const metrics = [
        {
            label: 'WQI',
            id: 'wqi'
        },
        {
            label: 'Chloride',
            chemical: true,
            id: 'chloride'
        },
        {
            label: 'Copper',
            chemical: true,
            id: 'copper'
        },
        {
            label: 'Fluoride',
            chemical: true,
            id: 'fluroide'
        },
        {
            label: 'Iron',
            chemical: true,
            id: 'iron'
        },
        {
            label: 'Manganese',
            chemical: true,
            id: 'manganese'
        },
        {
            label: 'Nitrate',
            chemical: true,
            id: 'nitrate'
        },
        {
            label: 'Sulphate',
            chemical: true,
            id: 'sulphate'
        },
        {
            label: 'Arsenic',
            chemical: true,
            id: 'arsenic'
        },
        {
            label: 'Alkalinity',
            physical: true,
            id: 'alkalinity'
        },
        {
            label: 'Hardness',
            physical: true,
            id: 'hardness'
        },
        {
            label: 'pH',
            physical: true,
            id: 'ph'
        },
        {
            label: 'TDS',
            physical: true,
            id: 'tds'
        },
        {
            label: 'E.Coli',
            biological: true,
            id: 'ecoli'
        },
        {
            label: 'Coliform',
            biological: true,
            id: 'coliform'
        }
    ]

    return (
        <div>
            <div className="flex flex-wrap p-2">
                {metrics.map((m) => (
                    <div className="w-1/2 p-2">
                        <Link href={`/parameter/${m?.id}`}>
                            <a>
                                <Card className="p-4">
                                    <div className="text-2xl font-semibold">
                                        {m?.label}
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