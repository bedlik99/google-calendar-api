import classes from './calendar-month.css' assert { type: 'css' };
import WebComponent from "../../utils/web-component.js";

const template = document.createElement('template');
const signInContentToRender =/*template*/`
    <div class="main-element"></div>
`;

template.innerHTML = signInContentToRender;

class CalendarMonth extends WebComponent {

    constructor() {
        super(classes, template);
    }

    static get observedAttributes() {
        return ["month_name"];
    }

    attributeChangedCallback(prop, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this.render();
    }

    assignListeners() {

    }

    connectedCallback() {
        this.render();
        this.assignListeners();
    }

    render() {
    }

    get month_name() {
        return this.getAttribute("month_name");
    }

    set month_name(value) {
        this.setAttribute("month_name", value);
    }

}

window.customElements.define('calendar-month-content', CalendarMonth);