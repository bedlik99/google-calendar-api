import classes from './calendar-day.css' assert { type: 'css' };
import WebComponent from "../../utils/web-component.js";

const template = document.createElement('template');
const signInContentToRender =/*template*/`
    <div class="main-element">
        <p id="day" class="day-info"></p>
        <p id="dayNr" class="day-info"></p>
    </div>
`;

template.innerHTML = signInContentToRender;

class CalendarDay extends WebComponent {
    #weekDayName;
    #monthlyDayNumber;

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
        if (String(prop) === "day") {
            this.#weekDayName = this.day.split(" ")[0];
            this.#monthlyDayNumber = this.day.split(" ")[1];
        }

        if (this.hasMounted) {
            this.render();
        }
    }

    connectedCallback() {

        this.render();
        this.assignListeners();
        this.hasMounted = true;
    }

    render() {
        this.shadowRoot.querySelector("#day").textContent = this.#weekDayName;
        this.shadowRoot.querySelector("#dayNr").textContent = this.#monthlyDayNumber;
    }

    get day() {
        return this.getAttribute("day");
    }

    set day(value) {
        this.setAttribute("day", value);
    }

}

window.customElements.define('calendar-day-content', CalendarDay);