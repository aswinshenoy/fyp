import React from "react";

import AppView from "../../src/app";
import ParameterPageView from "../../src/parameter/page";
import APIFetch from "../../src/utils/APIFetch";

export async function getServerSideProps({ query }) {
    return APIFetch({
        query: `query ($slug: String!) {
          parameter(slug: $slug) {
            name
            locations{
                rank
                location {
                  name
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
                    parameter: data.parameter
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

const ParameterPage = ({ parameter }) => (
    <AppView meta={{ title: parameter?.name }}>
        <ParameterPageView parameter={parameter} />
    </AppView>
);

export default ParameterPage;