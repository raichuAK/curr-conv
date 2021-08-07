import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {

  static get properties() {
    return {
      counter: {
        type: Number
      }
    };
  }  

  constructor() {
    super();
    this.counter = 0;
  }

  negativeClick(event) {
    this.counter = this.counter - 1;
    this.requestUpdate();
  }

  positiveClick(event) {
    this.counter = this.counter + 1;
    this.requestUpdate();
  }

  render() {
    return html`
      <button type="button" @click="${this.positiveClick}">+</button>
      <br />
      <br />
      value is ${this.counter}
      <br />
      <br />
      <button type="button" @click="${this.negativeClick}">-</button>
    `;
  }
}
window.customElements.get('my-element') ||
  window.customElements.define('my-element', MyElement);
