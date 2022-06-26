type StringIndexed = Record<string, unknown>;

function isObject(obj: unknown): obj is StringIndexed {
    return (
        typeof obj === "object" &&
        obj !== null &&
        obj.constructor === Object &&
        obj.toString() === "[object Object]"
    );
}

function queryStringify(data: StringIndexed): string | never {
    if (!isObject(data)) {
        throw new Error("input must be an object");
    }

    const queryArray: [string, string][] = objectToFlatHash(data, "");

    return queryArray.map(([key, value]) => `${key}=${value}`).join("&");
}

function objectToFlatHash(
    data: StringIndexed | Array<unknown>,
    keyPrefix: string
): [string, string][] {
    let keyValuePair: [string, string][] = [];

    Object.entries(data).forEach(([key, value]) => {
        key = keyPrefix ? `${keyPrefix}[${key}]` : key;

        if (Array.isArray(value) || isObject(value)) {
            keyValuePair = [...keyValuePair, ...objectToFlatHash(value, key)];
        } else {
            value = `${value}`;
            keyValuePair.push([key, value as string]);
        }
    });

    return keyValuePair;
}

export { queryStringify };
