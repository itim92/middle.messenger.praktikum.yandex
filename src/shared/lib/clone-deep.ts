function cloneDeepEtalon<T extends object = object>(obj: T) {
    return (function _cloneDeep(
        item: T
    ): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
        // Handle:
        // * null
        // * undefined
        // * boolean
        // * number
        // * string
        // * symbol
        // * function
        if (item === null || typeof item !== "object") {
            return item;
        }

        // Handle:
        // * Date
        if (item instanceof Date) {
            return new Date(item.valueOf());
        }

        // Handle:
        // * Array
        if (item instanceof Array) {
            const copy: Array<unknown> = [];
            item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));

            return copy;
        }

        // Handle:
        // * Set
        if (item instanceof Set) {
            const copy = new Set();
            item.forEach((v) => copy.add(_cloneDeep(v)));

            return copy;
        }

        // Handle:
        // * Map
        if (item instanceof Map) {
            const copy = new Map();
            item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

            return copy;
        }

        // Handle:
        // * Object
        if (item instanceof Object) {
            const copy: Record<string | number | symbol, unknown> = {};

            // Handle:
            // * Object.symbol
            Object.getOwnPropertySymbols(item).forEach(
                (s) => (copy[s] = _cloneDeep(item[s]))
            );

            // Handle:
            // * Object.name (other)
            Object.keys(item).forEach((k) => (copy[k] = _cloneDeep(item[k])));

            return copy;
        }

        throw new Error(`Unable to copy object: ${item}`);
    })(obj);
}

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
