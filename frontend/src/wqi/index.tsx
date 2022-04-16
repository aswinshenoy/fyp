import React, {useState} from "react";
import { Button, Card, TabSwitcher } from "@traboda/dsr";
import APIFetch from "../utils/APIFetch";
import ParameterInput from "./ParameterInput";

const WQICalculator = () => {

    const [params, setParams] = useState({});
    const [wqi, setWQI] = useState(null);

    const onCalculate = () => {
        APIFetch({
            query: `query ($params: JSONScalar!) { calculateWQI(params: $params) }`,
            variables: {
                params: JSON.stringify(params)
            }
        }).then(({ data, success }) => {
            if(success && data?.calculateWQI) {
                setWQI(data.calculateWQI);
            }
        });
    }

    const parameters = [
        {
            title: "Manganese",
            key: "mn",
            chem: true
        },
        {
            title: "Iron",
            key: "fe",
            chem: true
        },
        {
            title: "Nitrate",
            key: "no2",
            chem: true
        },
        {
            title: 'Arsenic',
            key: 'as',
            chem: true
        },
        {
            title: 'Chloride',
            key: 'cl',
            chem: true
        },
        {
            title: 'Sulphate',
            key: 'sl',
            chem: true
        },
        {
            title: 'Copper',
            key: 'cu',
            chem: true
        },
        {
            title: 'TDS',
            key: 'tds',
            phy: true
        },
        {
            title: 'Acidity (PH)',
            key: 'ph',
            phy: true
        },
        {
           title: 'Turbidity',
           key: 'turbidity',
            phy: true
        },
        {
            title: 'Alkalinity',
            key: 'alkalinity',
            phy: true
        },
        {
            title: 'Hardness',
            key: 'hardness',
            phy: true
        }
    ]

    return (
        <div className="flex py-8 justify-center">
            <div style={{ width: '1200px', maxWidth: '100%' }}>
                <div className="p-3">
                    <h1 className="text-4xl font-semibold mb-2">WQI Calculator</h1>
                </div>
                <div className="flex flex-wrap px-2">
                    <div style={{ width: '720px', maxWidth: '100%'}} className="w-2/3 p-1">
                        <Card className="w-full bg-white">
                            <div style={{ minHeight: '60vh'  }}>
                                <TabSwitcher
                                    isVertical
                                    items={[
                                        {
                                            label: 'Chemical',
                                            key: 'chem',
                                            rendererFunc: () => (
                                                <ParameterInput
                                                    parameters={parameters.filter(p => p.chem)}
                                                    setData={setParams}
                                                    data={params}
                                                />
                                            )
                                        },
                                        {
                                            label: 'Physical',
                                            key: 'phy',
                                            rendererFunc: () => (
                                                <ParameterInput
                                                    parameters={parameters.filter(p => p.phy)}
                                                    setData={setParams}
                                                    data={params}
                                                />
                                            )
                                        }
                                    ]}
                                />
                            </div>
                            <div className="p-2">
                                <Button onClick={onCalculate} className="w-full py-3 text-2xl">
                                    Calculate WQI
                                </Button>
                            </div>
                        </Card>
                    </div>
                    <div className="w-1/3 p-1">
                        <Card className="w-full flex justify-center items-center bg-white">
                            {wqi ? (
                                <div className="text-center">
                                    <div className="text-6xl font-semibold">
                                        {wqi}
                                    </div>
                                    <div className="text-2xl font-semibold">
                                        Water Quality Index
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center p-4">
                                    <div className="opacity-80">
                                        Enter values for the parameters, and click to
                                        calculate the Water Quality Index (WQI).
                                    </div>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default WQICalculator;