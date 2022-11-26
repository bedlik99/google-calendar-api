class MyCounter extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    increment() {
        this.count++;
    }

    assignEventListeners() {
        let btn = this.shadow.querySelector('#btn');
        btn.addEventListener('click', this.increment.bind(this));
    }

    get count() {
        return this.getAttribute("count");
    }

    set count(value) {
        this.setAttribute("count", value);
    }


    static get observedAttributes() {
        return ["count"];
    }

    attributeChangedCallback(prop, oldValue, newValue) {
        if (prop == "count") {
            this.render();
            this.assignEventListeners();
        }
    }

    connectedCallback() {
        this.render();
        this.assignEventListeners();
    }

    render() {
        this.shadow.innerHTML = /*html*/`
            <h1>Counter</h1>
            ${this.count == null ? 0 : this.count}
            <button id="btn">Increment</button>
        `;
    }
}

customElements.define('my-counter', MyCounter);

export default MyCounter;