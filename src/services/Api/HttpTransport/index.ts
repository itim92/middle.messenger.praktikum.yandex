import { queryStringify } from "@/shared/lib/query-stringify";
import { Primitive } from "@/shared/types/Primitive";

const METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
} as const;

type MethodKeysType = keyof typeof METHODS;
type MethodType = typeof METHODS[MethodKeysType];

type HTTPOptions = {
    data?: XMLHttpRequestBodyInit | Record<string, Primitive>;
    headers?: Record<string, Primitive>;
    timeout?: number;
    method?: MethodType;
};

class HTTPTransport {
    get = (url: string, options: HTTPOptions = {}) => {
        if (options.data) {
            url += queryStringify(options.data as Record<string, Primitive>);
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

            xhr.withCredentials = true;
            xhr.timeout = timeout;
            xhr.onabort = reject;
            xhr.ontimeout = reject;
            xhr.onerror = reject;
            xhr.onload = function () {
                let result = xhr.responseText;
                if (/^{|\[/.test(result)) {
                    result = JSON.parse(result);
                }

                resolve(result);
            };

            if (headers) {
                for (const header in options.headers) {
                    xhr.setRequestHeader(header, headers[header]?.toString());
                }
            }

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                if (
                    typeof FormData === "function" &&
                    options.data instanceof FormData
                ) {
                    xhr.send(options.data);
                } else {
                    xhr.setRequestHeader("content-type", "application/json");
                    xhr.send(JSON.stringify(options.data));
                }
            }
        });
    };
}

const httpTransportService = new HTTPTransport();
export { httpTransportService, HTTPTransport };
