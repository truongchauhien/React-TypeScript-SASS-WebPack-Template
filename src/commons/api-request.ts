const buildQueryString = (params) => {
    if (!params) {
        return new URLSearchParams();
    }

    const urlSearchParams = new URLSearchParams(params);
    return urlSearchParams;
};

function buildUrl(
    useHttps: boolean,
    host: string,
    port: number,
    path: string,
    params: { [key: string]: string | number }) {

    const protocol = useHttps ? 'https' : 'http';
    const baseUrl = `${protocol}://${host}:${port}`;
    const url = new URL(path, baseUrl);
    url.search = buildQueryString(params).toString(); // '?' is added automatically if absent.
    return url;
};

async function request(options: {
    method: 'HEAD' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    resource: string,
    params: { [key: string]: string | number },
    body: { [key: string]: string | number },
    useAccessToken: boolean
}): Promise<{
    body: {
        [key: string]: any
    },
    response: Response
}> {
    const { method, resource, params, body, useAccessToken } = options;
    const headers = {
        'Content-Type': 'application/json'
    };

    const url = buildUrl(USE_HTTPS, API_HOST, API_PORT, resource, params);
    const response = await fetch(url, {
        mode: 'cors',
        method: method,
        headers: headers,
        body: (body && JSON.stringify(body)) ?? null,
        credentials: 'include'
    });

    let returnBody = {};
    const responseContentType = response.headers.get('content-type');
    if (responseContentType && responseContentType.includes('application/json')) {
        returnBody = await response.json();
    }

    return {
        body: returnBody,
        response: response
    };
}
