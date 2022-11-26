const template = document.createElement('template');

const userCardToRender =/*template*/`
  <style>
    @import "/web-component-help/learning-examplesexamples/userCard.css";
  </style>
  <div class="user-card">
    <img/>
    <div>
        <h3></h3>    
    </div>
    <div class="info">
        <slot name="email"></slot>
        <slot name="phone"></slot>
    </div>
    <button id="toggle-info">Hide Info</button>
    <h1>Counter</h1>
    <p id="counter">0</p>
    <button id="btn">Increment</button>
  </div>
`;

template.innerHTML = userCardStyle + userCardToRender;

class UserCard extends HTMLElement {

  constructor() {
    super();
    this.showInfo = true;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
    this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
  }

  increment() {
    this.counter++;
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    const info = this.shadowRoot.querySelector('.info');
    const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

    if (this.showInfo) {
      info.style.display = 'block';
      toggleBtn.innerText = 'Hide Info';
    } else {
      info.style.display = 'none';
      toggleBtn.innerText = 'Show Info';
    }
  }

  assignEventListeners() {
    this.shadowRoot.querySelector('#toggle-info').addEventListener('click', this.toggleInfo.bind(this));
    this.shadowRoot.querySelector('#btn').addEventListener('click', this.increment.bind(this));
  }

  get counter() {
    return this.getAttribute("counter");
  }

  set counter(value) {
    this.setAttribute("counter", value);
  }

  static get observedAttributes() {
    return ["counter"];
  }

  attributeChangedCallback(prop, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    this.render();
  }

  connectedCallback() {
    this.render();
    this.assignEventListeners();
  }

  render() {
    this.shadowRoot.querySelector("#counter").innerText = this.counter;
  }

}

window.customElements.define('user-card', UserCard);