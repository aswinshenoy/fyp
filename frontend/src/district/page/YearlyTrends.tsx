import React, {useEffect, useState} from 'react';

import APIFetch from '../../utils/APIFetch';
import LineChartCard from "../../shared/LineChartCard";


const DistrictYearlyTrends = ({ districtID }) => {

    const [trends, setTrends] = useState(null);

    const fetchTrends = () => {
        APIFetch({
            query: `query($id: ID!){
              district(id: $id){
                stats {
                    yearlyTrend
                }
              }
            }`,
            variables: {
                id: districtID
            }
        }).then(({ data, success, errors }) => {
            if(success && data?.district) {
                const params = []
                Object.keys(data.district.stats?.yearlyTrend).forEach(key => {
                    params.push({
                        name: key,
                        trend: data.district.stats?.yearlyTrend[key]
                    })
                })
                setTrends(params);
            }
        })
    };

    useEffect(fetchTrends, []);

    return (
        <div>
            <h3 className="text-2xl text-center font-semibold mb-2">Yearly Trends</h3>
            {trends?.length > 0 && (
                <div className="flex flex-wrap mx-0">
                    {trends?.map((t) => (
                        <div key={`${t.name}-trend-card`} className="w-1/3 p-2">
                            <LineChartCard
                                trend={t.trend}
                                name={t.name}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

};

export default DistrictYearlyTrends;