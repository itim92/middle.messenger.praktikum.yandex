import { Component } from "../component";

export function render(container: HTMLElement, component: Component) {
    container.innerHTML = "";
    component.dispatchComponentDidMount();
    container.appendChild(component.element);
}
