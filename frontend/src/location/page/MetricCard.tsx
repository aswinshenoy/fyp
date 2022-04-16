import React from "react";
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { AxisPointerComponent, GridComponent } from 'echarts/components';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import {Badge, Button, Card} from "@traboda/dsr";

echarts.use([CanvasRenderer, AxisPointerComponent, GridComponent, GaugeChart]);

const MetricCard = ({ minValue, colors, maxValue, value, unit, parameter, chemical, biological, physical, districtID = null }) => (
    <Card className="bg-white">
        <div className="flex flex-wrap">
            <div className="w-1/2">
                {chemical ? (
                    <Badge color="warning" className="px-2 py-1"  variant="solid">
                        Chemical
                    </Badge>
                ) : biological ? (
                    <Badge color="success" className="px-2 py-1"  variant="solid">
                        Biological
                    </Badge>
                ) : (
                    <Badge color="shade" className="px-2 py-1" variant="solid">
                        Physical
                    </Badge>
                )}
            </div>
        </div>
        <ReactEChartsCore
            echarts={echarts}
            option={{
                series: [
                    {
                        type: 'gauge',
                        startAngle: 180,
                        endAngle: 0,
                        min: minValue || 0,
                        max: maxValue,
                        splitNumber: 8,
                        axisLine: {
                            lineStyle: {
                                width: 10,
                                color: colors ? colors : [
                                    [0.25, '#7CFFB2'],
                                    [0.5, '#58D9F9'],
                                    [0.75, '#FDDD60'],
                                    [1, '#FF6E76'],
                                ]
                            }
                        },
                        pointer: {
                            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                            length: '10%',
                            width: 20,
                            offsetCenter: [0, '-35%'],
                            itemStyle: {
                                color: 'auto'
                            }
                        },
                        axisTick: {
                            length: 10,
                            lineStyle: {
                                color: 'auto',
                                width: 2
                            }
                        },
                        axisLabel: {
                            show: false
                        },
                        splitLine: {
                            length: 16,
                            lineStyle: {
                                color: 'auto',
                                width: 4
                            }
                        },
                        title: {
                            offsetCenter: [0, '85%'],
                            fontSize: 18
                        },
                        detail: {
                            fontSize: 26,
                            offsetCenter: [0, '45%'],
                            valueAnimation: true,
                            formatter: function (value) {
                                return Math.round((value + Number.EPSILON) * 10000) / 10000 + `${unit != null ? unit : ' ml/L'}`;
                            },
                            color: 'auto'
                        },
                        data: [
                            { value: (Math.round((value + Number.EPSILON) * 10000) / 10000), name: parameter?.name }
                        ]
                    }
                ]
            }}
        />
        {districtID && (
            <div>
                <Button link={`/parameter/${parameter?.slug}?districtID=${districtID}`}>
                    Explore
                </Button>
            </div>
        )}
    </Card>
);

export default MetricCard;