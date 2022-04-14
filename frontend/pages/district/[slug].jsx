import React from "react";
import APIFetch from "../../src/utils/APIFetch";
import AppView from "../../src/app";
import DistrictPageView from "../../src/district/page";

export async function getServerSideProps({ query }) {
    return APIFetch({
        query: `query ($slug: String!) {
              district(slug: $slug) {
                name
                state
                locations{
                    id
                    name
                    wqi{
                      group
                      value
                    }
                }
                avgMetrics {
                  manganese
                  iron
                  nitrate
                  arsenic
                  fluoride
                  chloride
                  sulphate
                  copper
                  tds
                  ph
                  hardness
                  alkalinity
                  turbidity
                  ecoil
                  coliform
                  wqi {
                    value
                    group
                  }
                }
              }
            }`,
        variables: { slug: query?.slug }
    }).then(({ success, data, response }) => {
        if(success && data?.district) {
            return {
                props: {
                    district: data.district
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

const DistrictPage = ({ district }) => (
    <AppView meta={{ title: district?.name }}>
        <DistrictPageView district={district} />
    </AppView>
);

export default DistrictPage;