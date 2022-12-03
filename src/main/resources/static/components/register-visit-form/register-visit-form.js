import classes from './register-visit-form.css' assert {type: 'css'};
import WebComponent from '../../utils/web-component.js';

const template = document.createElement('template');

const registerVisitFormToRender =/*template*/`
    <div class="picked-day-backdrop">
        <div class="picked-day-form">
            <div>
                <h1>Visit registration details</h1>
                <h2 id="year-month-date"></h2>
                <h2 id="day-details"></h2>
            </div>
            <form id="registration-form">
                <div class="form-row-element">
                    <label class="input-label">Full name</label>
                    <input type="text" class="input-element" placeholder="*required" />
                </div>
                <div class="form-row-element">
                    <label class="input-label">Phone number</label>
                    <input type="tel" pattern="[0-9]{9}" required class="input-element" placeholder="*required" />
                </div>
                <div class="form-row-element">
                    <label class="input-label">Visit type</label>
                    <select name="Year" id="year-select" class="input-element" >
                        <option value="Normal" selected="selected">Normal</option>
                        <option value="Extended">Extended</option>
                        <option value="Special">Special</option>
                    </select>
                </div>
                <div class="form-row-element">
                    <label class="input-label">Visit time</label>
                    <input type="time" class="input-element" />
                </div>   
                <div class="form-buttons-element">
                    <input id="cancel-btn" type="button" value="Cancel" class="form-input-btn" />
                    <input type="submit" value="Request visit" class="form-input-btn" />
                </div>
            </form>
        </div>
    </div>
`;

template.innerHTML = registerVisitFormToRender;


class RegisterVisitForm extends WebComponent {

    constructor() {
        super(classes, template);
    }

    handleCancelRegistration() {
        this.remove();
    }

    handleFormSubmit(event) {
        event.preventDefault();
        console.log(event.currentTarget.id);
    }

    assignEventListeners() {
        this.shadowRoot.querySelector("#registration-form").addEventListener("submit", this.handleFormSubmit.bind(this));
    }

    connectedCallback() {
        this.render();
        this.assignEventListeners();
    }

    render() {
        const dayDetailsSplitted = this.day_details.split("-");
        this.shadowRoot.querySelector("#year-month-date").textContent = this.selected_month + " " + this.selected_year;
        this.shadowRoot.querySelector("#day-details").textContent = dayDetailsSplitted[0] + " " + dayDetailsSplitted[1];
        this.shadowRoot.querySelector("#cancel-btn").addEventListener("click", this.handleCancelRegistration.bind(this));
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

    get day_details() {
        return this.getAttribute("day_details");
    }

    set day_details(value) {
        this.setAttribute("day_details", value);
    }


}

window.customElements.define('register-visit-form', RegisterVisitForm);

