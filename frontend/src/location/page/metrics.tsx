import React from 'react';
import MetricCard from "./MetricCard";
import {TabSwitcher} from "@traboda/dsr";

const MetricView = ({ location }) => {

    console.log(location?.stats?.avg)

    return (
        <div className="w-full">
            <div className="p-2">
                <h3 className="text-2xl text-center font-semibold mb-2">Average Values</h3>
            </div>
            <TabSwitcher
                items={[
                    {
                        key: 'AllParameters',
                        label: 'All Parameters',
                        rendererFunc: () => (
                            <div className="flex flex-wrap w-full">
                                {location?.stats?.avg?.map((m, index) => (
                                    <div key={m.label} className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2">
                                        {/*// @ts-ignore*/}
                                        <MetricCard
                                            key={m.label}
                                            {...m}
                                            colors={m.parameter?.slug === 'ph' ?  [
                                                [(2/14), '#FF6E76'],
                                                [(4/14), '#FDDD60'],
                                                [(6.5/14), '#7CFFB2'],
                                                [(8.5/14), '#7CFFB2'],
                                                [(11/14), '#FDDD60'],
                                                [(14/14), '#FF6E76'],
                                            ] : null}
                                            biological={m?.parameter?.group?.slug === 'biological'}
                                            chemical={m?.parameter?.group?.slug === 'chemical'}
                                            physical={m?.parameter?.group?.slug === 'physical'}
                                        />
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
                                {location?.stats?.avg?.filter(m => m.parameter?.group?.slug === 'chemical').map(m => (
                                    <div key={m.label} className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2">
                                        {/*// @ts-ignore*/}
                                        <MetricCard key={m.label} {...m} chemical />
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
                                {location?.stats?.avg?.filter(m => m.parameter?.group?.slug === 'physical').map(m => (
                                    <div key={m.label} className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2">
                                        {/*// @ts-ignore*/}
                                        <MetricCard key={m.label} {...m} physical />
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
                                {location?.stats?.avg?.filter(m => m.parameter?.group?.slug === 'biological').map(m => (
                                    <div key={m.label} className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2">
                                        {/*// @ts-ignore*/}
                                        <MetricCard key={m.label} {...m} biological />
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