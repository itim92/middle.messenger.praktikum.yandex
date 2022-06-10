declare module "*.hbs" {
    const compile: (...args: unknown[]) => string;
    export default compile;
}
