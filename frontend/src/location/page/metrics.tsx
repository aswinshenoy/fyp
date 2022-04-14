import React from 'react';
import MetricCard from "./MetricCard";
import {TabSwitcher} from "@traboda/dsr";

const MetricView = ({ location }) => {

    const metrics = [
        {
            label: 'Chloride',
            maxVal: 250,
            value: location?.avgMetrics?.chloride,
            chemical: true,
        },
        {
            label: 'Copper',
            maxVal: 0.05,
            value: location?.avgMetrics?.copper,
            chemical: true,
        },
        {
            label: 'Fluoride',
            maxVal: 1.0,
            chemical: true,
            value: location?.avgMetrics?.fluoride
        },
        {
            label: 'Iron',
            maxVal: 0.3,
            chemical: true,
            value: location?.avgMetrics?.iron,
        },
        {
            label: 'Manganese',
            maxVal: 0.1,
            chemical: true,
            value: location?.avgMetrics?.manganese,
        },
        {
            label: 'Nitrate',
            maxVal: 45,
            chemical: true,
            value: location?.avgMetrics?.nitrate
        },
        {
            label: 'Sulphate',
            maxVal: 200,
            chemical: true,
            value: location?.avgMetrics?.sulphate
        },
        {
            label: 'Arsenic',
            maxVal: 0.01,
            chemical: true,
            value: location?.avgMetrics?.hardness
        },
        {
            label: 'Alkalinity',
            maxVal: 200,
            physical: true,
            unit: '',
            value: location?.avgMetrics?.alkalinity
        },
        {
            label: 'Hardness',
            maxVal: 200,
            physical: true,
            unit: '',
            value: location?.avgMetrics?.hardness
        },
        {
            label: 'pH',
            maxVal: 0,
            minVal: 14,
            physical: true,
            colors: [
                [(2/14), '#FF6E76'],
                [(4/14), '#FDDD60'],
                [(6.5/14), '#7CFFB2'],
                [(8.5/14), '#7CFFB2'],
                [(11/14), '#FDDD60'],
                [(14/14), '#FF6E76'],
            ],
            unit: '',
            value: location?.avgMetrics?.ph
        },
        {
            label: 'TDS',
            maxVal: 200,
            physical: true,
            unit: '',
            value: location?.avgMetrics?.tds
        },
        {
            label: 'E.Coli',
            maxVal: 200,
            biological: true,
            unit: '',
            value: location?.avgMetrics?.ecoil
        },
        {
            label: 'Coliform',
            maxVal: 200,
            biological: true,
            unit: '',
            value: location?.avgMetrics?.ecoil
        }
    ]

    return (
        <div className="w-full">
            <div className="p-2">
                <h3 className="text-xl font-semibold opacity-80">Parameter Values (Avg)</h3>
            </div>
            <TabSwitcher
                items={[
                    {
                        key: 'AllParameters',
                        label: 'All Parameters',
                        rendererFunc: () => (
                            <div className="flex flex-wrap w-full">
                                {metrics.map((m, index) => (
                                    <div key={m.label} className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2">
                                        {/*// @ts-ignore*/}
                                        <MetricCard key={m.label} {...m} />
                                    </div>
                                ))}
                            </div>
                        )
                    },
                    {
                        key: 'ChemicalProperties',
                        label: 'Chemical',
                        rendererFunc: () => (
                            <div className="flex flex-wrap w-full">
                                {metrics.filter(m => m.chemical).map(m => (
                                    <div key={m.label} className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2">
                                        {/*// @ts-ignore*/}
                                        <MetricCard key={m.label} {...m} />
                                    </div>
                                ))}
                            </div>
                        )
                    },
                    {
                        key: 'PhysicalProperties',
                        label: 'Physical',
                        rendererFunc: () => (
                            <div className="flex flex-wrap w-full">
                                {metrics.filter(m => m.physical).map(m => (
                                    <div key={m.label} className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2">
                                        {/*// @ts-ignore*/}
                                        <MetricCard key={m.label} {...m} />
                                    </div>
                                ))}
                            </div>
                        )
                    },
                    {
                        key: 'BiologicalProperties',
                        label: 'Biological',
                        rendererFunc: () => (
                            <div className="flex flex-wrap w-full">
                                {metrics.filter(m => m.biological).map(m => (
                                    <div key={m.label} className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2">
                                        {/*// @ts-ignore*/}
                                        <MetricCard key={m.label} {...m} />
                                    </div>
                                ))}
                            </div>
                        )
                    }
                ]}
            />
        </div>
    )
};

export default MetricView;