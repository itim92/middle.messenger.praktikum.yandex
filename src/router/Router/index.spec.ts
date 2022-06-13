import jsdom from "mocha-jsdom";
import { expect } from "chai";
import { Router } from "./index";
import { Component } from "@/lib/templator";
import { Route } from "./../Route";

describe("Test Route class", () => {
    jsdom({
        url: "http://localhost:1234/",
    });

    let div;
    let router: Router;
    beforeEach(() => {
        div = document.createElement("div");
        router = new Router(div);
    });

    it("is the same router object (check for singleton)", () => {
        expect(router).to.equal(new Router(undefined));
    });

    it("is the route correct placed inside router", () => {
        router.use("/", Component);
        expect(router.getRoute("/")).to.be.instanceof(Route);
    });
});
