import { Component } from "../component";
import { hasProperty } from "@/shared/lib/has-property";

export function renderComponent(container: HTMLElement, component: Component) {
    container.innerHTML = "";

    if (component.element) {
        component.dispatchComponentDidMount();
        container.appendChild(component.element);
    }
}

type PropsType = Record<string, unknown>;

const fragmentElement = "template";

function render(
    dom: HTMLElement | DocumentFragment,
    container: HTMLElement | DocumentFragment
) {
    container.appendChild(dom);
}

function createElement(
    element: string | typeof Component,
    props?: PropsType,
    children?: HTMLElement[]
): HTMLElement | DocumentFragment {
    const isComponent = (data: unknown): data is typeof Component => {
        return typeof data === "function";
    };

    if (isComponent(element)) {
        return createComponent(element, props);
    }

    return createHTMLElement(element, props, children);
}

function createComponent(
    componentClass: typeof Component,
    props?: PropsType
): HTMLElement {
    const component = new componentClass(props);

    component.dispatchComponentDidMount();
    component.render();

    if (!component.element) {
        throw new Error("Component element is not defined");
    }

    return component.element;
}

function createHTMLElement(
    element: string,
    props?: PropsType,
    children?: Array<HTMLElement>
): DocumentFragment | HTMLElement {
    let dom;
    if (element === fragmentElement) {
        dom = document.createDocumentFragment();
    } else {
        dom = document.createElement(element);
        applyAttributes(dom, props);
    }

    renderChildren(dom, children);

    return dom;
}

function renderChildren(
    dom: HTMLElement | DocumentFragment,
    children?: Array<HTMLElement>
) {
    if (!children) {
        return;
    }

    // if (typeof children === "function") {
    //     return children();
    // }

    for (const child of children) {
        render(child, dom);
    }
}

function applyAttributes(dom: HTMLElement, attributes?: PropsType) {
    if (!attributes) {
        return;
    }

    for (const [key, value] of Object.entries(attributes)) {
        if (isEvent(key)) {
            applyEvent(dom, key, value);
        } else if (typeof value === "string" && hasProperty(key, dom)) {
            dom[key] = value;
        }
    }
}

function isCallable(value: unknown): value is EventListener {
    return typeof value === "function";
}

function applyEvent(dom: HTMLElement, attrName: string, callback: unknown) {
    if (!isCallable(callback)) {
        return;
    }

    let once = false;
    let event;

    if (isEventOnce(attrName)) {
        once = true;
        event = attrName.slice(4).toLowerCase();
    } else {
        event = attrName.slice(2).toLowerCase();
    }

    dom.addEventListener(event, callback, { once });
}

function isEvent(attrName: string) {
    return isEventOnce(attrName) || isEventOn(attrName);
}

function isEventOn(attrName: string) {
    return /^on/.test(attrName);
}

function isEventOnce(attrName: string) {
    return /^once/.test(attrName);
}

export { render, createElement };
