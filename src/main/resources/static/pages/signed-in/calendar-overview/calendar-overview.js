import classes from './calendar-overview.css' assert { type: 'css' };
import WebComponent from "../../../utils/web-component.js";
import { getNameOfWeekDayByDate, getNextOrPreviousMonthName, getNumberOfDaysInGivenMonth } from '../../../utils/global-objects.js';

const template = document.createElement('template');

const currentYear = new Date().getFullYear();
const currentMonth = new Date().toLocaleString('en-us', { month: 'long' });

const signInContentToRender =/*template*/`
    <div class="main-section">
        <div id="nav-header" class="nav-header">
            <select name="Year" id="year-select" class="year-select">
                <option value=${currentYear} selected="selected">${currentYear}</option>
                <option value=${currentYear + 1}>${currentYear + 1}</option>
                <option value=${currentYear + 2}>${currentYear + 2}</option>
                <option value=${currentYear + 3}>${currentYear + 3}</option>
            </select>
            <button id="prev-month-btn" type="button" class="change-month-btn"><</button>
            <button id="next-month-btn" type="button" class="change-month-btn">></button>
            <div id="month-select" class="month-select-label">${currentMonth + " " + currentYear} </div>
            <button id="sign-out-btn" type="button" class="sign-out-btn">Sign out</button>
        </div>
        <div id="calendar-content" class="calendar-content">
            <div id="month-overview" class="month-overview"></div>
        </div>
    </div>
`;

template.innerHTML = signInContentToRender;

class CalendarOverview extends WebComponent {
    #monthDays;
    #monthOverviewElement;
    #selectedMonthLabel;

    constructor() {
        super(classes, template);
    }

    updateSelectedYear(event) {
        this.selected_year = this.shadowRoot.querySelector("#year-select").value;
        this.#selectedMonthLabel.textContent = this.selected_month + " " + this.selected_year;
    }

    changeMonth(directionFlag, event) {
        const futureSelectedMonth = getNextOrPreviousMonthName(this.selected_month, directionFlag);
        if (futureSelectedMonth === null) {
            return;
        }

        const newLabel = this.#selectedMonthLabel.cloneNode();
        newLabel.textContent = futureSelectedMonth + " " + this.selected_year;
        this.#selectedMonthLabel.replaceWith(newLabel);
        this.#selectedMonthLabel = this.shadowRoot.querySelector("#month-select");
        this.selected_month = futureSelectedMonth;
    }

    signOut(event) {
        localStorage.removeItem("Authorization");
        window.route(event, "/sign-in");
    }

    static get observedAttributes() {
        return ["selected_year", "selected_month"];
    }

    attributeChangedCallback(prop, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }

        if (this.hasMounted) {
            this.render();
        }
    }

    assignEventListeners() {
        this.shadowRoot.querySelector("#year-select").addEventListener("change", this.updateSelectedYear.bind(this));
        this.shadowRoot.querySelector("#next-month-btn").addEventListener("click", this.changeMonth.bind(this, true));
        this.shadowRoot.querySelector("#prev-month-btn").addEventListener("click", this.changeMonth.bind(this, false));
        this.shadowRoot.querySelector("#sign-out-btn").addEventListener("click", this.signOut.bind(this));
    }

    connectedCallback() {
        this.#monthOverviewElement = this.shadowRoot.querySelector("#month-overview");
        this.#selectedMonthLabel = this.shadowRoot.querySelector("#month-select");
        this.selected_year = currentYear;
        this.selected_month = currentMonth;

        this.render();
        this.assignEventListeners();
        this.hasMounted = true;
    }

    disconnectedCallback() {
    }

    render() {
        this.#monthDays = [];
        this.#monthOverviewElement.textContent = "";
        const numberOfDaysInSelectedMonth = getNumberOfDaysInGivenMonth(this.selected_year, this.selected_month);

        for (let dayNumber = 1; dayNumber <= numberOfDaysInSelectedMonth; dayNumber++) {
            let dayElement = this.#monthOverviewElement.appendChild(document.createElement("calendar-day-content"));
            dayElement.setAttribute("day", getNameOfWeekDayByDate(this.selected_year, this.selected_month, dayNumber) + " " + String(dayNumber));
            this.#monthDays.push(dayElement);
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