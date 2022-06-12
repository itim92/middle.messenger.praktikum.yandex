import jsdom from "mocha-jsdom";
import { expect } from "chai";
import { Route } from "./index";
import { Component } from "@/lib/templator";

describe("Test Route class", () => {
    jsdom({
        url: "http://localhost:1234/",
    });

    let route;
    beforeEach(() => {
        route = new Route({
            pathname: "/some-url",
            view: Component,
            root: document.createElement("div"),
        });
    });

    it("correct pathname setted", () => {
        expect(Reflect.get(route, "pathname")).to.equal("/some-url");
    });

    it("correct component created", () => {
        route.render();
        expect(Reflect.get(route, "block")).to.instanceof(Component);
    });

    it("correct match method work", () => {
        expect(route.match("/")).to.equal(false);
        expect(route.match("/some-url/")).to.equal(false);
        expect(route.match("/some-url")).to.equal(true);
    });
});
