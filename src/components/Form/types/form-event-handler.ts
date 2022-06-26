import { Component } from "@/lib/templator";
import { FormValuesType } from "./form-values";

export type FormEventHandlerType = (
    event: FormDataEvent,
    payload: { component: Component; values: FormValuesType }
) => void;
