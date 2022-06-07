export function isTextNode(code: string) {
    return /^([_\n\w\d\sа-я?!.,{}()[\]'"]+|{[_\n\w\d\sа-я?!.,{}()[\]'"]+}\s+)</i.test(
        code.trim()
    );
}

export function isOpenTag(code: string) {
    return /^<[a-z]/i.test(code);
}

export function isEndOfOpenTag(code: string) {
    return /^\/?>/.test(code);
}

export function isCloseOfPairTag(code: string) {
    return /^<\//.test(code);
}

export function isComponent(code: string) {
    return /^<[A-Z]+/.test(code);
}

export function isAttribute(code: string) {
    return /^\w+[\w\d-_]=/i.test(code);
}

export function isTextNodeHasVars(code: string) {
    return /{ ?[a-z._\s\d]+ ?}/i.test(code);
}

export function isTextNodeHasLogic(code: string) {
    return /^{ ?\[?[`"'a-z]/i.test(code);
}
