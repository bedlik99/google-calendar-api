import { appObject } from "../app.js";
import { sendRequest } from "./http-request.js";
import { validateTokenRequest } from "./requests-all.js";

function ignoreOnLoading() { }

async function validateToken() {
    let accessToken = localStorage.getItem("Authorization");
    if (accessToken === null || accessToken === undefined || accessToken.trim().length === 0) {
        return false;
    }
    const req = { ...validateTokenRequest };
    req.params.body = accessToken;
    const result = await sendRequest(ignoreOnLoading, req);
    return !!result;
}

async function navigateToProperAuthPage(targetPath) {
    let newPath = targetPath;
    const validatedOk = await validateToken();
    if (!validatedOk && newPath.startsWith("/signed-in")) {
        newPath = "/sign-in";
        window.history.pushState({}, "", newPath);
    } else if (validatedOk && newPath === "/sign-in") {
        newPath = "/signed-in/calendar-overview";
        window.history.pushState({}, "", newPath);
    }
    return newPath;
}

const route = (event, targetPath) => {
    const currentPath = window.location.pathname;
    // event = event || window.event;
    if (event !== null && event !== undefined) {
        event.preventDefault();
    }
    if (currentPath === targetPath) return;
    window.history.pushState({}, "", targetPath);
    handleLocation();
};

const handleLocation = async () => {
    let path = window.location.pathname;
    if (path === "/sign-in" || path.startsWith("/signed-in")) {
        path = await navigateToProperAuthPage(path);
    }

    switch (path) {
        case "/":
            appObject.render("home-content");
            break;

        case "/sign-in":
            appObject.render("sign-in-content");
            break;

        case "/signed-in/calendar-overview":
            window.addScriptToHtmlHead("/pages/signed-in/calendar-overview/calendar-overview.js", "module");
            window.addScriptToHtmlHead("/components/calendar-day/calendar-day.js", "module");
            window.addScriptToHtmlHead("/components/register-visit-form/register-visit-form.js", "module");
            appObject.render("calendar-overview-content");
            break;
    }
};

window.onpopstate = handleLocation;
window.route = route;
handleLocation();
