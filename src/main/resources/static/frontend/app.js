import classes from './app.css' assert {type: 'css'};
import {sendRequest} from "./utils/http-request.js";
import WebComponent from "./utils/web-component.js";

const template = document.createElement('template');

const appToRender =/*template*/`
  <div class="main-app"></div>
`;

template.innerHTML = appToRender;

export let appObject;

export default class App extends WebComponent {

    constructor() {
        super(classes, template);
        appObject = this;
    }

    connectedCallback() {
        this.render("home-content");
    }

    isElementPresent(elementName) {
        const htmlElementsArray = [...this.shadowRoot.querySelector(".home-content").children];
        const element = htmlElementsArray.find(el => el.nodeName.toLowerCase() === elementName);
        return !!element;
    }

    applyFetchedData = (wasSuccessful, result) => {
        if (wasSuccessful) {
            console.log(JSON.stringify(result));
        }
    }

    applyEffect() {
        // sendRequest({ url: "/json-data", params: window.standardRequestConfig.params }, this.applyFetchedData).finally(() => {});
    }

    render(customComponentName) {
        this.shadowRoot.querySelector(".main-app").replaceChildren(document.createElement(customComponentName));



        this.applyEffect();
    }

}

window.customElements.define('main-app', App);