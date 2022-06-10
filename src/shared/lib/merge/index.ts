import { Indexed, isIndexed } from "@/shared/types/Indexed";

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    const obj = { ...lhs };
    for (const key of Object.keys(rhs)) {
        if (Array.isArray(obj[key]) && Array.isArray(rhs[key])) {
            obj[key] = [
                ...(obj[key] as Array<unknown>),
                ...(rhs[key] as Array<unknown>),
            ];
        } else if (isIndexed(obj[key]) && isIndexed(rhs[key])) {
            obj[key] = merge(obj[key] as Indexed, rhs[key] as Indexed);
        } else {
            obj[key] = rhs[key];
        }
    }

    return lhs;
}
