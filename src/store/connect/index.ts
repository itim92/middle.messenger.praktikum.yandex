import { Component } from "@/lib/templator";
import { Indexed } from "@/shared/types/Indexed";
import store from "@/store/Store";

export function connect(mapStateToProps: (state: Indexed) => Indexed) {
    return function (ComponentClass: typeof Component) {
        return class extends ComponentClass {
            constructor(props: Record<string, unknown> | undefined) {
                super({ ...props, ...mapStateToProps(store.getState()) });
            }
        };
    };
}
