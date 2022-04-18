import React from "react";
import {Card} from "@traboda/dsr";

import * as echarts from "echarts/core";
import ReactEChartsCore from "echarts-for-react/lib/core";
import { AxisPointerComponent, GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([CanvasRenderer, AxisPointerComponent, GridComponent, LineChart]);

const LineChartCard = ({ name, trend }) => (
    <Card className="bg-white">
        <div className="text-xl font-bold">{name}</div>
        <div>
            <ReactEChartsCore
                echarts={echarts}
                option={{
                    xAxis: {
                        type: 'category',
                        data: Object.keys(trend)
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: Object.keys(trend).map((k) => trend[k]),
                            smooth: true,
                            type: 'line',
                        }
                    ]
                }}
            />
        </div>
    </Card>
);

export default LineChartCard;