import { Component } from "../../../templator";
import { FormElementType } from "./form-element";

export type FormElementEventPayloadType = {
    component: Component;
    element: FormElementType;
    name: string;
    value: string;
};

export type FormElementEventHandlerType = (
    event: FormDataEvent,
    payload: FormElementEventPayloadType
) => void;
