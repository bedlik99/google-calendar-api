import classes from './calendar-day.css' assert { type: 'css' };
import WebComponent from "../../utils/web-component.js";

const template = document.createElement('template');
const signInContentToRender =/*template*/`
    <div class="main-element">
        <p id="weekDay" class="day-info"></p>
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
        return ["day_details"];
    }

    attributeChangedCallback(prop, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        if (String(prop) === "day_details") {
            this.#weekDayName = this.day_details.split("-")[0];
            this.#monthlyDayNumber = this.day_details.split("-")[1];
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
        this.shadowRoot.querySelector("#weekDay").textContent = this.#weekDayName;
        this.shadowRoot.querySelector("#dayNr").textContent = this.#monthlyDayNumber;
    }

    get day_details() {
        return this.getAttribute("day_details");
    }

    set day_details(value) {
        this.setAttribute("day_details", value);
    }

}

window.customElements.define('calendar-day-content', CalendarDay);