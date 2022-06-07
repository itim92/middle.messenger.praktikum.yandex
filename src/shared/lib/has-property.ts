const hasProperty = <K extends string>(
    key: K,
    x: object
): x is { [key in K]: unknown } => key in x;

export { hasProperty };
