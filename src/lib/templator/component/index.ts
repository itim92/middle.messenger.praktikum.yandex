import { EventBus } from "../../event-bus";
import { EVENTS } from "./events";

type RenderResult = DocumentFragment | null;

export type DefaultPropsType = object & {
    className?: string;
};

export class Component<
    ComponentProps extends DefaultPropsType = Record<string, unknown>
> {
    // region private_p

    _element!: HTMLElement;

    _meta: {
        lastCssDisplayProperty?: string;
        props: ComponentProps;
        tagName: string;
    };

    _eventBus: EventBus;

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
        tagName?: string
    ) {
        console.trace(props);
        props = props ?? {};
        this._eventBus = new EventBus();
        this._meta = {
            props,
            tagName: tagName ?? this.getDefaultTagName(),
        };

        this.props = this._makePropsProxy(props);

        this._registerEvents();
        this.eventBus.emit(EVENTS.INIT);
    }

    getDefaultTagName(): string {
        return "div";
    }

    // Может переопределять пользователь, необязательно трогать
    render(): RenderResult {
        return null;
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

    show() {
        let cssDisplayProperty: string;
        if (this.element?.style.display !== "none") {
            cssDisplayProperty = this._meta.lastCssDisplayProperty ?? "";
        } else {
            cssDisplayProperty = "";
        }

        if (this.element) {
            this.element.style.display = cssDisplayProperty;
        }
    }

    hide() {
        if (!this.element) {
            return;
        }

        if (this.element.style.display !== "none") {
            this._meta.lastCssDisplayProperty = this.element.style.display;
        }
        this.element.style.display = "none";
    }

    // endregion public_f
    // region private_f
    // region flow

    _render() {
        if (!this.element) {
            return;
        }

        this.element.innerHTML = "";
        this.element.textContent = "";

        const renderResult = this.render();
        if (renderResult !== null) {
            this.element.appendChild(renderResult);
        }
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
        const { tagName } = this._meta;

        this._element = this._createDocumentElement(tagName);
        this._element.className = this.props.className ?? "";
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
