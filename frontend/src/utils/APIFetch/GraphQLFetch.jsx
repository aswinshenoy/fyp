import fetch from 'isomorphic-fetch';

const graphQLEndpoint = 'http://localhost/api/graphql/' || process.env.GRAPHQL_SERVER_ENDPOINT;
const prefetchEndpoint = 'http://localhost/api/graphql/' || process.env.PREFETCH_SERVER_ENDPOINT;

const errorCodeStatuses = {
    400: { code: 'BAD_REQUEST', label: 'Bad Request (400)' },
    401: { code: 'UNAUTHORIZED', label: 'Not Authorized (401)' },
    404: { code: 'NOT_FOUND', label: 'Not Found (404)' },
    500: { code: 'INTERNAL_SERVER_ERROR', label: 'Internal Server Error (500)' },
    502: { code: 'BAD_GATEWAY', label: 'Bad Gateway (502)' },
    503: { code: 'SERVICE_UNAVAILABLE', label: 'Service unavailable (503)' },
    504: { code: 'GATEWAY_TIMEOUT', label: 'Gateway Timeout (504)' },
};

const GraphQLFetch = async ({ query, endpoint, variables, req }) => {
    const APIConfig = {
        method: 'POST', credentials: 'include', headers: {},
        body: JSON.stringify({ query, variables: variables || null }),
    };
    APIConfig['headers'] = req ? {
        'cookie': req?.headers['cookie'],
        'user-agent': req?.headers['user-agent'],
    } : {};

    APIConfig['headers']['Content-Type'] = 'application/json';
    const _endpoint = endpoint ? endpoint : req ? prefetchEndpoint : graphQLEndpoint;
    return await fetch(
        _endpoint,
        APIConfig
    ).then((response) => {
            const contentType = response.headers.get('content-type');
            if(response.ok) {
                if(contentType && contentType.indexOf('application/json') !== -1)
                    return response.json().then((json) => {
                        return { data: json?.data, response, errors: json?.errors };
                    });
                if(contentType && contentType.indexOf('text') !== -1) return response.text().then((text) => {
                    return { data: text, response, errors: null };
                });
            }
            throw response;
        }).catch((e) => {
            let errorObj = null;
            try { errorObj = errorCodeStatuses[e.status]; } catch (e) {
                errorObj = { code: 'UNKNOWN ERROR', label: 'Unknown Error - ' + e.status };
            }
            return {
                errors: [{ code: errorObj?.code, message: errorObj?.label, }],
                response: e,
            };
        });
};

export default GraphQLFetch;