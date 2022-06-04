function isEqual(a: object, b: object): boolean {
    if (!a || !b) {
        return a === b;
    }

    const bothKeys: string[] = [...Object.keys(a), ...Object.keys(b)];

    return bothKeys.every((key) => {
        const aKey = Object.getOwnPropertyDescriptor(a, key);
        const bKey = Object.getOwnPropertyDescriptor(b, key);

        if (typeof aKey === "undefined" || typeof bKey === "undefined") {
            return false;
        }

        if (typeof aKey.value === "object" && typeof bKey.value === "object") {
            return isEqual(aKey.value, bKey.value);
        }

        return aKey.value === bKey.value;
    });
}

//
// function isObject(data: unknown): data is object {
//     return typeof data === "object" && data?.constructor === Object;
// }

export default isEqual;

const a = { a: 1 };
const b = { a: 1 };
isEqual(a, b); //?
