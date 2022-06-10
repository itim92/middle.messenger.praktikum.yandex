import { Indexed, isIndexed } from "@/shared/types/Indexed";

export function set(
    object: Indexed | unknown,
    path: string,
    value: unknown
): Indexed | unknown {
    if (!isIndexed(object)) {
        return object;
    }

    const pathKeys = path.split(".");
    const lastKey = pathKeys.pop();
    let lastItem = object;

    for (const key of pathKeys) {
        if (typeof lastItem[key] !== "object") {
            lastItem[key] = {};
        }

        lastItem = lastItem[key] as Indexed;
    }

    lastItem[lastKey as string] = value;

    return object;
}
