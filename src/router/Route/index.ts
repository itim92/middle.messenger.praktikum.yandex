import { Component, renderComponent } from "@/lib/templator";
import { RouteComponent } from "@/router/types";

type RouteProps = {
    pathname: string;
    view: RouteComponent;
    root: HTMLElement;
};

export class Route {
    private readonly pathname: string;
    private readonly view: RouteComponent;
    private readonly root: HTMLElement;
    private block?: Component;

    constructor({ pathname, view, root }: RouteProps) {
        this.pathname = pathname;
        this.view = view;
        this.root = root;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this.render();
        }
    }

    leave() {
        if (this.block) {
            this.block.hide();
        }
    }

    match(pathname: string) {
        return pathname === this.pathname;
    }

    render() {
        if (!this.block) {
            if ("component" in this.view) {
                this.block = new this.view.component(this.view.props);
            } else {
                this.block = new this.view();
            }
        }

        this.block.show();
        renderComponent(this.root, this.block);
    }
}
