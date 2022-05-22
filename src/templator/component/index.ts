import { EventBus } from "../event-bus";
import { EVENTS } from "./events";

export type ChildrenType = {
    selector: string;
    component: Component | Component[];
};

export class Component<
    ComponentProps extends object = Record<string, unknown>
> {
    // region private_p

    readonly events: Record<string, EventListenerOrEventListenerObject | never>;

    _element: HTMLElement;

    _meta: {
        props: ProxyHandler<ComponentProps>;
        tagName: string;
        className: string;
    };

    _eventBus: EventBus;

    _children: ChildrenType[];

    // endregion private_p

    // region public_p

    props: ComponentProps;

    get element() {
        return this._element;
    }

    get eventBus() {
        return this._eventBus;
    }

    // endregion public_p

    constructor(
        props: ComponentProps = {} as ComponentProps,
        tagName = "div",
        className = ""
    ) {
        this._eventBus = new EventBus();
        this._meta = {
            props,
            tagName,
            className,
        };

        this.props = this._makePropsProxy(props);

        this._registerEvents();
        this.eventBus.emit(EVENTS.INIT);
    }

    // Может переопределять пользователь, необязательно трогать
    render(): string {
        return "";
    }

    inject(): ChildrenType[] {
        return [];
    }

    // region flow
    init() {
        this._createResources();
        this.eventBus.emit(EVENTS.FLOW_RENDER);
    }

    // Может переопределять пользователь, необязательно трогать
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
    componentDidMount(_oldProps: ComponentProps) {}

    dispatchComponentDidMount() {
        this.eventBus.emit(EVENTS.FLOW_CDM);
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _oldProps: ComponentProps,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _newProps: Partial<ComponentProps>
    ) {
        return true;
    }

    // endregion flow

    // region public_f
    setProps(nextProps: Partial<ComponentProps>) {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
        this.eventBus.emit(EVENTS.FLOW_CDU, this.props, nextProps);
    }

    // endregion public_f
    // region private_f
    // region flow

    _inject() {
        this._children = this.inject();

        if (!this._children) {
            return;
        }

        for (const child of this._children) {
            const { selector, component } = child;

            const childContainer = this.element.querySelector(selector);

            if (!childContainer) {
                continue;
            }

            const fragment = document.createDocumentFragment();
            if (Array.isArray(component)) {
                component.forEach((item) => {
                    item.dispatchComponentDidMount();
                    fragment.appendChild(item.element);
                });
            } else {
                component.dispatchComponentDidMount();
                fragment.appendChild(component.element);
            }

            childContainer.replaceWith(fragment);
        }
    }

    _render() {
        this._unregisterComponentEvents();

        this.element.innerHTML = this.render();

        this._registerComponentEvents();

        this._inject();
    }

    _componentDidMount() {
        this.componentDidMount(this.props);
    }

    _componentDidUpdate(oldProps: ComponentProps, newProps: ComponentProps) {
        const response = this.componentDidUpdate(oldProps, newProps);

        if (response) {
            this.eventBus.emit(EVENTS.FLOW_RENDER);
        }
    }

    _mapComponentEvents(
        callback: (
            element: Element,
            eventType: keyof ElementEventMap,
            listener: EventListenerOrEventListenerObject
        ) => void
    ) {
        setTimeout(() => {
            for (const key in this.events) {
                const [eventType, ...selector] = key.split(" ");
                const elements = this.element.querySelectorAll(
                    selector.join(" ")
                );

                for (const element of elements) {
                    callback(
                        element,
                        eventType as keyof ElementEventMap,
                        this.events[key] as EventListenerOrEventListenerObject
                    );
                }
            }
        });
    }

    _registerComponentEvents() {
        this._mapComponentEvents((element, eventType, listener) => {
            element.addEventListener(eventType, listener);
        });
    }

    _unregisterComponentEvents() {
        this._mapComponentEvents((element, eventType, listener) =>
            element.removeEventListener(eventType, listener)
        );
    }

    // endregion flow
    // region utils

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    _registerEvents() {
        this.eventBus.on(EVENTS.INIT, this.init.bind(this));
        this.eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this.eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
        this.eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    _createResources() {
        const { tagName, className } = this._meta;
        this._element = this._createDocumentElement(tagName);

        if (className) {
            this._element.className = className;
        }
    }

    _makePropsProxy(props: ComponentProps): ComponentProps {
        return new Proxy(props, {
            set(target, key, value) {
                if (target[key as keyof ComponentProps] === value) {
                    return true;
                }

                target[key as keyof ComponentProps] = value;
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            },
        });
    }

    // endregion utils
    // endregion private_f
}
