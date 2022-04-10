import React from 'react';
import {SearchBox} from "@traboda/dsr";

const SearchBoxContainer = () => {

    const [keyword, setKeyword] = React.useState('');

    const handleSearch = (keyword) => {

    };

    return (
        <div className="text-black">
            <SearchBox hideLabel keyword={keyword} setKeyword={setKeyword} onSearch={handleSearch} />
        </div>
    );

};

export default SearchBoxContainer;