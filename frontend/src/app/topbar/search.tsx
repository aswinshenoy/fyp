import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import {SearchBox} from "@traboda/dsr";
import APIFetch from '../../utils/APIFetch';


const ResultContainer = styled('div')`
    position: absolute;
    left: 0;
    top: 6.25vh;
    width: 100%;
    border-radius: 0.5rem;
    background-color: #fff;
    z-index: 9000;
`;

const SearchBoxContainer = () => {

    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const handleSearch = (keyword) => {
        setLoading(true);
        APIFetch({
            query: `query ($keyword: String!){
              search(keyword: $keyword){
                title
                slug
                type
              }
            }`,
            variables: { keyword }
        }).then(({ data, success }) => {
            setLoading(false)
            if(success && data?.search){
                setResults(data.search);
            }
        })
    };

    useEffect(() => {
        if(keyword.length > 2){
            handleSearch(keyword);
        }
    }, [keyword]);

    return (
        <div className="relative text-black">
            <SearchBox
                labels={{
                    placeholder: 'Search for panchayat, district, state or parameter'
                }}
                hideLabel
                keyword={keyword}
                setKeyword={setKeyword}
                onSearch={handleSearch}
            />
            {keyword?.length > 3 && (
                <ResultContainer>
                    <div className="p-2 bg-gray-300 text-sm rounded-t-lg mb-2">Search Results</div>
                    {isLoading ? (
                        <div>Searching for results. Please wait...</div>
                    ) : (
                        <div className="p-1">
                            {results.map((result, index) => (
                                <a
                                    key={index}
                                    className="p-3 block bg-gray-50 rounded-lg w-full hover:bg-gray-100"
                                    href={`/${result.type}/${result.slug}`}
                                >
                                    {result.title}
                                </a>
                            ))}
                        </div>
                    )}
                </ResultContainer>
            )}
        </div>
    );

};

export default SearchBoxContainer;