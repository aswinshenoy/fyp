import React, {useEffect, useState} from "react";
import APIFetch from "../../utils/APIFetch";
import LineChartCard from "../../shared/LineChartCard";
import PieChartCard from "../../shared/PieChartCard";

const DistrictTestStats = ({ districtID }) => {

    const [stats, setStats] = useState(null);

    const fetchStats = () => {
        APIFetch({
            query: `query ($districtID: ID){
              district(id: $districtID){
                stats{
                  sourceBreakup{
                    source{
                      id
                      name
                      slug
                    }
                    count
                  }
                  testRatesYearly
                }
              }
            }`,
            variables: {
                districtID
            }
        }).then(({ success, data }) => {
            if(success && data?.district?.stats){
                setStats(data.district.stats);
            }
        })
    };

    useEffect(fetchStats, []);

    return (
        <div className="flex flex-wrap mx-0">
            <div className="w-1/2 p-2">
                {stats && (
                    <PieChartCard
                        name="Source Type"
                        data={stats.sourceBreakup.map((s) => { return { value: s.count, name: s?.source?.name } })}
                    />
                )}
            </div>
            <div className="w-1/2 p-2">
                {stats && (
                    <LineChartCard
                        name="Tests Recorded"
                        trend={stats?.testRatesYearly}
                    />
                )}
            </div>
        </div>
    )

};

export default DistrictTestStats;