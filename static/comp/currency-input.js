import { LitElement, html } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import * as Service from '../../lib/service';
import * as Util from '../../lib/utility';

export class CurrencyInput extends LitElement {

  static get properties() {
    return {
        inputAmount: {
            type: String,
        }
    };
  }  

  constructor() {
    super();
    this.counter = 0;
    this.setCurrencyList();
  }

  async setCurrencyList() {
    this._currencyList = [];
    this._currencyList = await Service.modelCurrencyList();
    this.requestUpdate();
  }

  currencyChange(event) {
    const sourceCurrency = event.target.value;
    const sourceAmount = Util.findInShadowRoot(this, `#enteredAmount`).value;
    this.currencyAmountChange(sourceCurrency, sourceAmount);
  }

  currencyAmountChange(currency, amount) {
    const currChangeEvent = new CustomEvent('currency-amount-change', {
        detail: {
            sourceCurrency: currency,
            sourceAmount: amount
        },
        composed: true,
        bubbles: true,
        cancelable: true,
     });
     this.dispatchEvent(currChangeEvent);
  }

  focus() {
    Util.findInShadowRoot(this, `#enteredAmount`).type = 'number';
  }

  blur(event) {
    const sourceCurrency = Util.findInShadowRoot(this, `#selectCurrency`).value;
    const sourceAmount = Util.findInShadowRoot(this, `#enteredAmount`).value;
    this.currencyAmountChange(sourceCurrency, sourceAmount);
    Util.findInShadowRoot(this, `#enteredAmount`).type = 'text';
  }

  render() {
    return html `
        <div id="currency">
            <div id="inputCurrency">
                <select id="selectCurrency" @change="${this.currencyChange}">
                    <option selected hidden value>--select--</option>
                    ${repeat(
                        this._currencyList,
                        currency => html` <option value="${currency.currencyCode}">${currency.currencyName}</option> `,
                    )}
                </select>
            </div>
            <div id="inputAmount">
                <label>Amount converted</label>
                <input 
                    autocomplete="off"
                    class="form-control"
                    id="enteredAmount" 
                    type="number"  
                    @blur="${this.blur}"
                    @focus="${this.focus}"
                    .value="${this.inputAmount}"/>
            </div>
        <\div>
    `;

  }

}
window.customElements.get('currency-input') ||
  window.customElements.define('currency-input', CurrencyInput);
