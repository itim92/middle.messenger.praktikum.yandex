type StringIndexed = Record<string, any>;

const obj: StringIndexed = {
    key: 1,
    key2: "test",
    key3: false,
    key4: true,
    key5: [1, 2, 3],
    key6: { a: 1 },
    key7: { b: { d: 2 } },
};

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

export default queryStringify;

queryStringify(obj); //?
// 'key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2'
