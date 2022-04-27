import {Header} from "./components/Header";
import {routes} from "./router";

let route = routes.filter((i) => i.url === document.location.pathname);
route = route[0];

if (!route) {
    route = routes[routes.length - 1];
}

document.getElementById("header").innerHTML = (new Header({routes})).render();
document.getElementById("app").innerHTML = route.component.render();
