export default class WebComponent extends HTMLElement {
    hasMounted = false;

    constructor(cssClass, template) {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.adoptedStyleSheets = [cssClass];
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

}
