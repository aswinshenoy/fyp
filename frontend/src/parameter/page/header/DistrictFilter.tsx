import React from 'react';
import Selector from '../../../shared/Selector';
import APIFetch from '../../../utils/APIFetch';

const DistrictFilter = ({ district, setDistrict }) => {

    const fetchDistrict = (keyword, callback) => {
        APIFetch({
            query: `query ($keyword: String!){
                 districts(keyword: $keyword){
                  value: id
                  id
                  label: name
                }
            }`,
            variables: { keyword }
        }).then(({ success, data, errors }) => {
            if(success)
                callback(data?.districts);
        });
    };

    return (
        <div style={{ width: '250px', maxWidth: '100%' }}>
            <div className="text-sm ml-2">
                Filter by Districts
            </div>
            <Selector
                isAsync
                isClearable
                placeholder="Search & Select a district"
                onLoadOptions={fetchDistrict}
                value={district}
                onChange={setDistrict}
                menuPortalTarget={typeof document !== 'undefined' ? document?.body : null}
            />
        </div>
    );

};

export default DistrictFilter;