declare module "*.tpl" {
    const template: (props?: Record<string, unknown>) => DocumentFragment;
    export default template;
}
