export type Indexed<T = unknown> = {
    [key in string]: T;
};

export function isIndexed(data: unknown): data is Indexed {
    return typeof data === "object" && !Array.isArray(data);
}
