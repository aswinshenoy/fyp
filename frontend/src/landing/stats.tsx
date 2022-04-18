import React, { useEffect, useState } from "react";
import Link from "next/link";
import {Card} from "@traboda/dsr";
import APIFetch from "../utils/APIFetch";
import LineChartCard from "../shared/LineChartCard";

type StatsType = {
    wqiYearly: (object|any|{})
}

const StatsOverview = () => {

    const [stats, setStats] = useState<StatsType>();

    const fetchStats = () => {
        APIFetch({
            query: `{
              stats
            }`,
        }).then(({ success, data }) => {
            if (success && data?.stats) {
                setStats(data.stats);
            }
        });
    };

    useEffect(fetchStats, []);

    const _round = (value) => (Math.round((value + Number.EPSILON) * 100) / 100);

    const getTrend = () => {
        if(stats?.wqiYearly){
            const params = [];
            Object.keys(stats?.wqiYearly).forEach(key => {
                params.push({
                    name: key,
                    trend: stats?.wqiYearly[key]
                })
            })
            return params;
        }

    }

    console.log(getTrend())

    return stats ? (
        <div className="py-2">
            <div className="px-4 text-2xl font-semibold">
                Overview
            </div>
            <div className="flex flex-wrap p-2">
                {Object.keys(stats).filter((m) => m!= 'wqiYearly').map((m) => (
                    <div className="w-1/2 p-2">
                        <Card className="bg-white shadow-lg p-4">
                            <div className="text-5xl font-semibold">
                                {_round(stats[m])}
                            </div>
                            <div className="text-xl">
                                {m}
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
            {stats?.wqiYearly &&
            <div className="shadow-lg bg-white rounded-lg m-2">
                <LineChartCard
                    name="Water Quality Index - Yearly Trend"
                    trend={stats?.wqiYearly}
                />
            </div>}
        </div>
    ) : (<div />)
};

export default StatsOverview;