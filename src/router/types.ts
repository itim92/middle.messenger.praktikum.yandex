import { Component } from "@/lib/templator";
import { Router } from "./Router";

export type RouteComponent =
    | typeof Component
    | {
          component: typeof Component;
          props?: Record<string, unknown>;
      };

type RouterMiddlewareArgs = {
    pathname: string;
    router: Router;
};

export type RouterMiddleware = (data: RouterMiddlewareArgs) => boolean;
