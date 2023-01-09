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
    if (!validatedOk && newPath.startsWith("/view/signed-in")) {
        newPath = "/view/sign-in";
        window.history.pushState({}, "", newPath);
    } else if (validatedOk && newPath === "/view/sign-in") {
        newPath = "/view/signed-in/calendar-overview";
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
    if (path === "/view/sign-in" || path.startsWith("/view/signed-in")) {
        path = await navigateToProperAuthPage(path);
    }

    switch (path) {
        case "/":
            appObject.render("home-content");
            break;

        case "/view/sign-in":
            appObject.render("sign-in-content");
            break;

        case "/view/signed-in/calendar-overview":
            window.addScriptToHtmlHead("/frontend/pages/signed-in/calendar-overview/calendar-overview.js", "module");
            window.addScriptToHtmlHead("/frontend/components/calendar-day/calendar-day.js", "module");
            window.addScriptToHtmlHead("/frontend/components/register-visit-form/register-visit-form.js", "module");
            appObject.render("calendar-overview-content");
            break;
    }
};

window.onpopstate = handleLocation;
window.route = route;
handleLocation();
