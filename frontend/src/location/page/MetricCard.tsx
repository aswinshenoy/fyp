import {Card} from "@traboda/dsr";
import React from "react";
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { AxisPointerComponent, GridComponent } from 'echarts/components';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([CanvasRenderer, AxisPointerComponent, GridComponent, GaugeChart]);

const MetricCard = ({ name, maxValue, value }) => {

    return (
        <Card className="bg-white">
            <ReactEChartsCore
                echarts={echarts}
                option={{
                    series: [
                        {
                            type: 'gauge',
                            startAngle: 180,
                            endAngle: 0,
                            min: 0,
                            max: maxValue,
                            splitNumber: 8,
                            axisLine: {
                                lineStyle: {
                                    width: 10,
                                    color: [
                                        [0.25, '#7CFFB2'],
                                        [0.5, '#58D9F9'],
                                        [0.75, '#FDDD60'],
                                        [1, '#FF6E76'],
                                    ]
                                }
                            },
                            pointer: {
                                icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                                length: '12%',
                                width: 20,
                                offsetCenter: [0, '-40%'],
                                itemStyle: {
                                    color: 'auto'
                                }
                            },
                            axisTick: {
                                length: 12,
                                lineStyle: {
                                    color: 'auto',
                                    width: 2
                                }
                            },
                            axisLabel: {
                                show: false
                            },
                            splitLine: {
                                length: 20,
                                lineStyle: {
                                    color: 'auto',
                                    width: 5
                                }
                            },
                            title: {
                                offsetCenter: [0, '75%'],
                                fontSize: 25
                            },
                            detail: {
                                fontSize: 35,
                                offsetCenter: [0, '45%'],
                                valueAnimation: true,
                                formatter: function (value) {
                                    return Math.round((value + Number.EPSILON) * 10000) / 10000 + ' ml/l';
                                },
                                color: 'auto'
                            },
                            data: [
                                { value: (Math.round((value + Number.EPSILON) * 10000) / 10000), name }
                            ]
                        }
                    ]
                }}
            />
        </Card>
    );
}

export default MetricCard;