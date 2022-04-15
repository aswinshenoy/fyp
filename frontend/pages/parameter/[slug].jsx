import React from "react";

import AppView from "../../src/app";
import ParameterPageView from "../../src/parameter/page";
import APIFetch from "../../src/utils/APIFetch";

export async function getServerSideProps({ query }) {
    return APIFetch({
        query: `query ($slug: String!) {
          years
          parameter(slug: $slug) {
            name
            slug
            id
            locations{
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
        variables: { slug: query?.slug }
    }).then(({ success, data, response }) => {
        if(success && data?.parameter) {
            return {
                props: {
                    parameter: data.parameter,
                    years: data?.years
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

const ParameterPage = ({ years, parameter }) => (
    <AppView meta={{ title: `${parameter?.name} - Water Parameter Statistics` }}>
        <ParameterPageView years={years} parameter={parameter} />
    </AppView>
);

export default ParameterPage;