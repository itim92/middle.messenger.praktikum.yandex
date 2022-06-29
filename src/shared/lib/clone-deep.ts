function cloneDeep<T extends object = object>(obj: T) {
    if (!obj) {
        return obj;
    }

    let result: T;

    if (Array.isArray(obj)) {
        result = obj.map((child) => {
            return child.constructor === Object ? cloneDeep(child) : child;
        }) as T;
    } else {
        result = {} as T;
        for (const key of Object.keys(obj)) {
            const property = Object.getOwnPropertyDescriptor(obj, key);
            if (!property) {
                continue;
            }

            result = Object.defineProperty(result, key, {
                ...property,
                value:
                    Array.isArray(property.value) ||
                    property.value.constructor === Object
                        ? cloneDeep(property.value)
                        : property.value,
            });
        }
    }

    return result;
}

export default cloneDeep;
