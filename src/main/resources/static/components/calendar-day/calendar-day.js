import classes from './calendar-day.css' assert { type: 'css' };
import WebComponent from "../../utils/web-component.js";

const template = document.createElement('template');
const signInContentToRender =/*template*/`
    <div class="main-element">
        <p id="day"></p>
        <input type="time"/>
    </div>
`;

template.innerHTML = signInContentToRender;

class CalendarDay extends WebComponent {

    constructor() {
        super(classes, template);
    }

    assignListeners() {

    }

    static get observedAttributes() {
        return ["day"];
    }

    attributeChangedCallback(prop, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this.render();
    }

    connectedCallback() {
        this.render();
        this.assignListeners();
    }

    render() {
        this.shadowRoot.querySelector("#day").innerHTML = this.day;
    }

    get day() {
        return this.getAttribute("day");
    }

    set day(value) {
        this.setAttribute("day", value);
    }

}

window.customElements.define('calendar-day-content', CalendarDay);