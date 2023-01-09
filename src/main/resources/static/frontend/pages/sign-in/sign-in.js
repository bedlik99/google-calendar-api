import classes from './sign-in.css' assert { type: 'css' };
import WebComponent from "../../utils/web-component.js";

const template = document.createElement('template');

const signInContentToRender =/*template*/`
    <div class="sign-in-content">
        <sign-in-form></sign-in-form>
    </div>
`;

template.innerHTML = signInContentToRender;

class SignIn extends WebComponent {

    constructor() {
        super(classes, template);
    }

    connectedCallback() {
        this.render();
    }

    render() {
    }

}

window.customElements.define('sign-in-content', SignIn);