import React from 'react';
import Selector from '../../../shared/Selector';
import APIFetch from '../../../utils/APIFetch';

const StateFilter = ({ state, setState }) => {

    const fetchState = (keyword, callback) => {
        APIFetch({
            query: `query ($keyword: String!){
                 states(keyword: $keyword){
                  value: id
                  id
                  label: name
                }
            }`,
            variables: { keyword }
        }).then(({ success, data, errors }) => {
            if(success)
                callback(data?.states);
        });
    };

    return (
        <div style={{ width: '250px', maxWidth: '100%' }}>
            <div className="text-sm ml-2">
                Filter by State
            </div>
            <Selector
                isAsync
                isClearable
                placeholder="Search & Select a State"
                onLoadOptions={fetchState}
                value={state}
                onChange={setState}
                menuPortalTarget={typeof document !== 'undefined' ? document?.body : null}
            />
        </div>
    );

};

export default StateFilter;