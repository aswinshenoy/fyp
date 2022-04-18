import React from 'react';
import {Card} from "@traboda/dsr";

import * as echarts from "echarts/core";
import ReactEChartsCore from "echarts-for-react/lib/core";
import { LegendComponent, TooltipComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([CanvasRenderer, LegendComponent, TooltipComponent, PieChart]);

const PieChartCard = ({ name, data }) => (
    <Card className="bg-white">
        <div className="text-xl font-bold">{name}</div>
        <div>
            <ReactEChartsCore
                echarts={echarts}
                option={{
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right'
                    },
                    series: [
                        {
                            data: data,
                            type: 'pie',
                            radius: '50%',
                        }
                    ]
                }}
            />
        </div>
    </Card>
);

export default PieChartCard;