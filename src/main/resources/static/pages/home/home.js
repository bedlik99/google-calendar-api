import classes from './home.css' assert {type: 'css'};
import WebComponent from "../../utils/web-component.js";

const template = document.createElement('template');

const homeContentToRender =/*template*/`
    <div class="home-content">
        <div class="header-home"> 
            <h1>Welcome to my site!</h1>
            <button id="signIn" type="button">Sign in</button>
            <button type="button">Register</button>
        </div>
    </div>
`;

template.innerHTML = homeContentToRender;

class Home extends WebComponent {

    constructor() {
        super(classes, template);
    }

    connectedCallback() {
        this.render();
        this.assignEventListeners();
    }

    handleSignInButton(event) {
        window.route(event, '/sign-in');
    }

    assignEventListeners() {
        this.shadowRoot.querySelector("#signIn").addEventListener('click', this.handleSignInButton.bind(this));
    }

    render() {
    }

}

window.customElements.define('home-content', Home);
