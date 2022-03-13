import React from "react";
import MetricCard from "./MetricCard";

const LocationPageView = ({ location }) => {

    const metrics = [
        {
            label: 'Chloride',
            maxVal: 250,
            value: location?.avgMetrics?.chloride
        },
        {
            label: 'Copper',
            maxVal: 0.05,
            value: location?.avgMetrics?.copper
        },
        {
            label: 'Fluoride',
            maxVal: 1.0,
            value: location?.avgMetrics?.fluoride
        },
        {
            label: 'Iron',
            maxVal: 0.3,
            value: location?.avgMetrics?.iron,
        },
        {
            label: 'Manganese',
            maxVal: 0.1,
            value: location?.avgMetrics?.manganese,
        },
        {
            label: 'Nitrate',
            maxVal: 45,
            value: location?.avgMetrics?.nitrate
        },
        {
            label: 'Sulphate',
            maxVal: 200,
            value: location?.avgMetrics?.sulphate
        },
        {
            label: 'Alkalinity',
            maxVal: 200,
            value: location?.avgMetrics?.alkalinity
        },
        {
            label: 'Hardness',
            maxVal: 200,
            value: location?.avgMetrics?.hardness
        },
        {
            label: 'Arsenic',
            maxVal: 0.01,
            value: location?.avgMetrics?.hardness
        }
    ]

    return (
        <div className="bg-gray-100 p-3">
            <div className="flex justify-center py-4">
                <div style={{ width: '1200px', maxWidth: '100%' }}>
                    <div className="bg-white p-3 rounded">
                        <div className="flex flex-wrap">
                            <div className="w-2/3 p-1">
                                <h1 className="text-5xl font-semibold mb-2">{location?.name}</h1>
                            </div>
                            <div className="w-1/3 p-1 justify-end text-right flex">
                                <div>
                                    <div className="text-3xl font-semibold mb-0">
                                        {Math.round(location?.avgMetrics?.wqi?.value)}/900
                                    </div>
                                    <div className="text-2xl font-semibold">
                                        {location?.avgMetrics?.wqi?.group}
                                    </div>
                                    <div className="text-lg">
                                        Water Quality Index (WQI)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex text-center flex-wrap">
                        {metrics.map((m) => (
                            <div className="w-1/4 p-2">
                                <MetricCard maxValue={m.maxVal} value={m.value} name={m.label} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

};

export default LocationPageView;