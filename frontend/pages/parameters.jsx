import React from "react";
import APIFetch from "../src/utils/APIFetch";
import AppView from "../src/app";
import ParametersListingView from "../src/parameter/listing";


export async function getServerSideProps({ query }) {
    return APIFetch({
        query: `{
          parameters{
            id
            name
            slug
            group{
              name
              slug
            }
          }
        }`,
    }).then(({ success, data, response }) => {
        if(success && data?.parameters) {
            return {
                props: {
                    parameters: data.parameters
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

const ParametersPage = ({ parameters }) => (
    <AppView meta={{ title: 'Parameters' }}>
        <ParametersListingView  parameters={parameters} />
    </AppView>
);

export default ParametersPage;