import React from "react";
import {TextInput} from "@traboda/dsr";

const ParameterInput = ({ parameters, data, setData }) => (
    <div>
        {parameters.map((p) => (
            <div className="flex flex-wrap p-2">
                <div className="w-1/2 flex items-center px-2">
                    <label className="font-bold mb-2">
                        {p.title}
                    </label>
                </div>
                <div className="w-1/2 px-2">
                    <TextInput
                        hideLabel
                        label={p.title}
                        placeholder="Enter Value"
                        name={p.key}
                        value={data[p.key]}
                        onChange={(value) => setData({...data, [p.key]: value })}
                    />
                </div>
            </div>
        ))}
    </div>
);

export default ParameterInput;