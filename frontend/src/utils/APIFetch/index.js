import GraphQLFetch from './GraphQLFetch';

const APIFetch = async ({
    query, variables, req = null
}) => {
    return await GraphQLFetch({ query, variables, req })
        .then(({ response, data, errors }) => {
            if(errors && errors?.length > 0)
                return { success: false, data, response, errors };
            return { success: true, data, response, errors };
        });
};

export default APIFetch;
