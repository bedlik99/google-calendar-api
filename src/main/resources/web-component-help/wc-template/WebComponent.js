
const template = document.createElement('template');

export const webComponentStyle =/*template*/`
    <style>
        .web-component {

        }
    </style>
`

const webComponentToRender =/*template*/`
  <div class="web-component">
    anything
  </div>
`;

template.innerHTML = webComponentStyle + webComponentToRender;

class WebComponent extends HTMLElement {

    constructor() {
        super();
        this.showInfo = true;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }

    assignEventListeners() {
        // assign all event listenrs
    }

    get someAttribute() {
        return this.getAttribute("someAttribute");
    }

    set someAttribute(value) {
        this.setAttribute("someAttribute", value);
    }

    static get observedAttributes() {
        return ["someAttribute"];
    }

    attributeChangedCallback(prop, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this.render();
    }

    connectedCallback() {
        this.render();
        this.assignEventListeners();
    }

    render() {

    }

}

window.customElements.define('web-component', WebComponent);