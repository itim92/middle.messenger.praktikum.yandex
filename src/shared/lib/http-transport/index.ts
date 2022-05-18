const METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
} as const;

type MethodKeysType = keyof typeof METHODS;
type MethodType = typeof METHODS[MethodKeysType];

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */

type HTTPOptions = {
    data?: XMLHttpRequestBodyInit | Record<string, PrimitiveType>;
    headers?: Record<string, PrimitiveType>;
    timeout?: number;
    method?: MethodType;
};

type PrimitiveType = string | number | boolean | object | PrimitiveType[];

function queryStringify(data: Record<string, PrimitiveType>): string {
    const queryString = [];

    for (const prop in data) {
        let value = data[prop];

        if (Array.isArray(value)) {
            value = value.join(",");
        } else if (typeof value === "object") {
            value = value.toString();
        }

        queryString.push(`${prop}=${value}`);
    }

    return `?${queryString.join("&")}`;
    // Можно делать трансформацию GET-параметров в отдельной функции
}

export class HTTPTransport {
    get = (url: string, options: HTTPOptions = {}) => {
        if (options.data) {
            url += queryStringify(
                options.data as Record<string, PrimitiveType>
            );
        }

        return this.request(
            url,
            {
                ...options,
                method: METHODS.GET,
            },
            options.timeout
        );
    };

    post = (url: string, options: HTTPOptions = {}) => {
        return this.request(
            url,
            {
                ...options,
                method: METHODS.POST,
            },
            options.timeout
        );
    };

    put = (url: string, options: HTTPOptions = {}) => {
        return this.request(
            url,
            {
                ...options,
                method: METHODS.PUT,
            },
            options.timeout
        );
    };

    delete = (url: string, options: HTTPOptions = {}) => {
        return this.request(
            url,
            {
                ...options,
                method: METHODS.DELETE,
            },
            options.timeout
        );
    };

    // PUT, POST, DELETE

    // options:
    // headers — obj
    // data — obj
    request = (url: string, options: HTTPOptions, timeout = 5000) => {
        const { headers, method, data } = options;

        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open(options.method ?? METHODS.GET, url);

            xhr.timeout = timeout;
            xhr.onabort = reject;
            xhr.ontimeout = reject;
            xhr.onerror = reject;
            xhr.onload = function () {
                resolve(xhr);
                // if (xhr.status >= 200 && xhr.status < 400) {
                //     resolve(xhr.response);
                // } else {
                //     reject({
                //         status: xhr.status,
                //         statusText: xhr.statusText
                //     });
                // }
            };

            if (headers) {
                for (const header in options.headers) {
                    xhr.setRequestHeader(header, headers[header]?.toString());
                }
            }

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(options.data as XMLHttpRequestBodyInit);
            }
        });
    };
}

const httpTransportService = new HTTPTransport();
export { httpTransportService };
