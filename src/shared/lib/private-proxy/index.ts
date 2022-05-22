export function PrivateProxy(props: Record<string | number | symbol, unknown>) {
    return new Proxy(props, {
        get(target, key) {
            if (typeof key === "string" && key.startsWith("_")) {
                throw new Error("Нет прав");
            }

            const value = target[key];
            return typeof value === "function" ? value.bind(target) : value; // (*)
        },
        defineProperty(target, key, descriptor) {
            if (typeof key === "string" && key.startsWith("_")) {
                throw new Error("Нет прав");
            }

            Object.defineProperty(target, key, descriptor);
            return true;
        },
        set(target, key, value) {
            if (typeof key === "string" && key.startsWith("_")) {
                throw new Error("Нет прав");
            }

            target[key] = value;
            return true;
        },
        deleteProperty(target, key) {
            if (typeof key === "string" && key.startsWith("_")) {
                throw new Error("Нет прав");
            }

            delete target[key];
            return true;
        },
        ownKeys(target) {
            return Object.keys(target).filter((key) => !key.startsWith("_"));
        },
    });
}
