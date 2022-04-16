import React from "react";
import AppView from "../src/app";
import WQICalculator from "../src/wqi";

const CalculateWQI = () => (
    <AppView meta={{ title: 'Calculate WQI' }}>
        <WQICalculator />
    </AppView>
)

export default CalculateWQI;