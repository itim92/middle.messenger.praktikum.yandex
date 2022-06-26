import jsdom from "mocha-jsdom";
import { expect } from "chai";
import { Component } from "./index";

describe("Test Component class", () => {
    jsdom({
        url: "http://localhost:1234/",
    });

    let component;
    const props = {
        className: "some-class",
        someProp1: "value1",
        someProp2: "value2",
    };

    beforeEach(() => {
        component = new Component(props);
    });

    it("is the correct props setted", () => {
        expect(component.props.someProp1).to.equal("value1");
        expect(component.props.someProp2).to.equal("value2");
    });

    it("is the component rendered to element", () => {
        expect(component.element.tagName).to.equal("DIV");
    });

    it("is the component element have correct class", () => {
        expect(component.element.className).to.equal("some-class");
        expect(component.element.classList.contains("some-class")).to.equal(
            true
        );
    });
});
