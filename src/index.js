import {Header} from "./components/Header";
import {routes, dispatchCurrenRouteByHash} from "./router";


function onRouteChange(route) {
    document.getElementById("app").innerHTML = route.component.render();
}

window.addEventListener('hashchange', (e) => {
    e.preventDefault();
    dispatchCurrenRouteByHash(onRouteChange)
});


document.getElementById("header").innerHTML = (new Header({routes})).render();
dispatchCurrenRouteByHash(onRouteChange);
