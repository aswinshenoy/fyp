import React from "react";

import AppView from "../../src/app";
import ParameterPageView from "../../src/parameter/page";
import APIFetch from "../../src/utils/APIFetch";

export async function getServerSideProps({ params, query }) {
    return APIFetch({
        query: `query ($slug: String!, $districtID: ID) {
          years
          sources {
            id
            name
          }
          parameter(slug: $slug) {
            name
            slug
            id
            sources
            treatments
            issues
            healthHazards
            locations(districtID: $districtID) {
                rank
                location {
                  name
                  type
                  id
                }
                value
                minValue
                maxValue
                samples
            }
          }
        }`,
        variables: { slug: params?.slug, districtID: query?.districtID },
    }).then(({ success, data, response }) => {
        if(success && data?.parameter) {
            return {
                props: {
                    parameter: data.parameter,
                    years: data?.years,
                    sources: data?.sources,
                    districtID: query && query?.districtID != undefined ? query?.districtID : null,
                }
            }
        } else {
            return {
                props: {
                    notFound: true
                }
            }
        }
    })
}

const ParameterPage = ({ query, districtID, years, sources, parameter }) => (
    <AppView meta={{ title: `${parameter?.name} - Water Parameter Statistics` }}>
        {parameter ? <ParameterPageView districtID={districtID} sources={sources} years={years} parameter={parameter} /> : <div>Failed to Load</div>}
    </AppView>
);

export default ParameterPage;