import classes from './calendar-overview.css' assert { type: 'css' };
import WebComponent from "../../../utils/web-component.js";
import { getNameOfWeekDayByDate, getNumberOfDaysInGivenMonth } from '../../../utils/global-objects.js';

const template = document.createElement('template');

const currentYear = new Date().getFullYear();

const signInContentToRender =/*template*/`
    <div class="main-section">
        <div id="nav-header" class="nav-header">
            <select name="Year" id="year-select">
                <option value=${currentYear} selected="selected">${currentYear}</option>
                <option value=${currentYear + 1}>${currentYear + 1}</option>
                <option value=${currentYear + 2}>${currentYear + 2}</option>
                <option value=${currentYear + 3}>${currentYear + 3}</option>
                <option value=${currentYear + 4}>${currentYear + 4}</option>
            </select>
            <button type="button"><</button>
            <button type="button">></button>
            <h1 id="month-select">January</h1>
        </div>
        <div id="calendar-content" class="calendar-content">
            <div id="nav-left-bar" class="nav-left-bar">
                <h1>Left nav bar</h1>
            </div>
            <calendar-month-content id="month-overview" class="month-overview" month_name="January"></calendar-month-content>
        </div>
    </div>
`;

template.innerHTML = signInContentToRender;

class CalendarOverview extends WebComponent {
    #calendarDays;
    #calendarMonth;

    constructor() {
        super(classes, template);
        this.selected_month = new Date().toLocaleString('en-us', { month: 'long' });
        this.selected_year = currentYear;
        this.#calendarMonth = this.shadowRoot.querySelector("#month-overview");
    }

    updateSelectedYear(event) {
        this.selected_year = this.shadowRoot.querySelector("#year-select").value;
    }

    updateSelectedMonth(event) {
        this.selected_month = this.shadowRoot.querySelector("#month-select").innerHTML;
    }

    static get observedAttributes() {
        return ["selected_year", "selected_month"];
    }

    attributeChangedCallback(prop, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this.render();
    }

    assignEventListeners() {
        this.shadowRoot.querySelector("#year-select").addEventListener("change", this.updateSelectedYear.bind(this));
        this.shadowRoot.querySelector("#month-select").addEventListener("change", this.updateSelectedYear.bind(this));
    }

    connectedCallback() {
        this.render();
        this.assignEventListeners();
    }

    render() {
        this.#calendarDays = [];
        this.#calendarMonth.textContent = "";

        for (let dayNumber = 1; dayNumber <= getNumberOfDaysInGivenMonth(this.selected_year, this.selected_month); dayNumber++) {
            let calendarDay = this.#calendarMonth.appendChild(document.createElement("calendar-day-content"));
            calendarDay.setAttribute("day", getNameOfWeekDayByDate(this.selected_year, this.selected_month, dayNumber) + " " + String(dayNumber));
            // calendarDay.setAttribute("dayNumber", )
            this.#calendarDays.push(calendarDay);
        }
    }


    get selected_year() {
        return this.getAttribute("selected_year");
    }

    set selected_year(value) {
        this.setAttribute("selected_year", value);
    }

    get selected_month() {
        return this.getAttribute("selected_month");
    }

    set selected_month(value) {
        this.setAttribute("selected_month", value);
    }

}

window.customElements.define('calendar-overview-content', CalendarOverview);