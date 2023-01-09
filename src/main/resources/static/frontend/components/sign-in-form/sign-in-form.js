import classes from './sign-in-form.css' assert {type: 'css'};
import WebComponent from "../../utils/web-component.js";
import { sendRequest } from "../../utils/http-request.js";
import { authRequest } from "../../utils/requests-all.js";

const template = document.createElement('template');
const inputClassName = "sign-in-input";

const signInFormToRender =/*template*/`
    <form id="sign-in-form" class="sign-in-form">
        <h1>Sign in</h1>
        <div>
            <label class="form-label">Username</label>
            <input id="usr" class=${inputClassName} required type="text" />
        </div>
        <div>
            <label class="form-label">Password</label>
            <input id="pass" class=${inputClassName} required type="password" />
        </div>
        <button id="submit-button" type="submit" value="Sign in">Submit</button>
    </form>
`;

template.innerHTML = signInFormToRender;

function validateUsername(username) {
    return username && username.length >= 4;
}

function validatePassword(password) {
    return password && password.length >= 8;
}

class SignInForm extends WebComponent {
    #userInput;
    #passwordInput;
    #signInForm;
    #submitButton;
    
    constructor() {
        super(classes, template);
    }

    onLoading() {
        this.#submitButton.textContent = "Submitting...";
        this.#submitButton.className = "btn-disabled";
        this.#submitButton.disabled = true;
    }

    validateInput(event) {
        const newValue = event.currentTarget.value;
        const elementIdSelector = "#" + String(event.currentTarget.id);

        switch (elementIdSelector) {
            case "#usr":
                this.#userInput.className = validateUsername(newValue) ? inputClassName : inputClassName + " invalid";
                break;
            case "#pass":
                this.#passwordInput.className = validatePassword(newValue) ? inputClassName : inputClassName + " invalid";
                break;
        }
    }

    resetInputClass(event) {
        this.shadowRoot.querySelector("#" + event.currentTarget.id).className = inputClassName;
    }

    handleSubmit(event) {
        event.preventDefault();
        const requestConfig = { ...authRequest };
        const username = this.#userInput.value.toString().trim();
        const password = this.#passwordInput.value.toString().trim();

        if (!validateUsername(username) || !validatePassword(password)) {
            return;
        }

        requestConfig.params.body.username = username;
        requestConfig.params.body.password = password;

        sendRequest(this.onLoading.bind(this), requestConfig).then((result) => {
            if (result === undefined) {
                alert("Unsuccessful sign in. Check your credentials and try again.");
                return;
            }
            localStorage.setItem("Authorization", "Bearer " + result.accessToken);
            window.route(event, "/view/signed-in/calendar-overview");
        }).finally(() => {
            this.#submitButton.disabled = false;
            this.#submitButton.className = "";
            this.#submitButton.textContent = "Submit";
        });
    }

    assignEventListeners() {
        this.#signInForm.onsubmit = this.handleSubmit.bind(this);
        this.#userInput.addEventListener("change", this.validateInput.bind(this));
        this.#userInput.addEventListener("keyup", this.resetInputClass.bind(this));
        this.#passwordInput.addEventListener("change", this.validateInput.bind(this));
        this.#passwordInput.addEventListener("keyup", this.resetInputClass.bind(this));
    }

    connectedCallback() {
        this.#userInput = this.shadowRoot.querySelector("#usr");
        this.#passwordInput = this.shadowRoot.querySelector("#pass");
        this.#signInForm = this.shadowRoot.querySelector("#sign-in-form");
        this.#submitButton = this.shadowRoot.querySelector("#submit-button");
        
        this.render();
        this.assignEventListeners();
    }

    render() {
    }

}

window.customElements.define('sign-in-form', SignInForm);

