import { Component } from "@/lib/templator";
import { Indexed } from "@/shared/types/Indexed";
import store, { StoreEvents } from "@/store/Store";
import { isEqual } from "@/shared/lib/is-equal";

export function connect(mapStateToProps: (state: Indexed) => Indexed) {
    return function (ComponentClass: typeof Component) {
        return class extends ComponentClass {
            constructor(props: Record<string, unknown> | undefined) {
                let state = mapStateToProps(store.getState());

                super({ ...props, ...state });

                store.on(StoreEvents.Updated, () => {
                    const newState = mapStateToProps(store.getState());
                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }

                    state = newState;
                });
            }
        };
    };
}
