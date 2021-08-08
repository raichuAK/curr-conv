import { LitElement, html } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import * as Service from '../../lib/service';
import * as Util from '../../lib/utility';
import { default as CONSTANT } from '../../lib/app.constant';

export class CurrencyInput extends LitElement {
  static get properties() {
    return {
      inputAmount: {
        type: String,
      },
    };
  }

  setInputAmount(amount) {
    Util.findInShadowRoot(this, `#${CONSTANT.CURRENCY_INPUT.AMOUNT.ID}`).type = 'text';
    this.inputAmount = amount;
  }

  constructor() {
    super();
    this.setCurrencyList();
  }

  firstUpdated() {
    this.inputAmount = '';
  }

  async setCurrencyList() {
    this._currencyList = [];
    this._currencyList = await Service.modelCurrencyList();
    this.requestUpdate();
  }

  currencyChange(event) {
    const sourceCurrency = event.target.value;
    const sourceAmount = Util.findInShadowRoot(this, `#${CONSTANT.CURRENCY_INPUT.AMOUNT.ID}`).value;
    this.currencyAmountChange(sourceCurrency, sourceAmount);
  }

  currencyAmountChange(currency, amount) {
    const currChangeEvent = new CustomEvent(`${CONSTANT.CURRENCY_INPUT.TRIGGER_EVENT.NAME}`, {
      detail: {
        currency,
        amount,
      },
      composed: true,
      bubbles: true,
      cancelable: true,
    });
    this.dispatchEvent(currChangeEvent);
  }

  focus() {
    Util.findInShadowRoot(this, `#${CONSTANT.CURRENCY_INPUT.AMOUNT.ID}`).type = 'number';
  }

  blur() {
    const sourceCurrency = Util.findInShadowRoot(this, `#${CONSTANT.CURRENCY_INPUT.TYPE.ID}`).value;
    const sourceAmount = Util.findInShadowRoot(this, `#${CONSTANT.CURRENCY_INPUT.AMOUNT.ID}`).value;
    this.currencyAmountChange(sourceCurrency, sourceAmount);
    Util.findInShadowRoot(this, `#${CONSTANT.CURRENCY_INPUT.AMOUNT.ID}`).type = 'text';
  }

  getCurrentInstanceValue() {
    return {
      currency: Util.findInShadowRoot(this, `#${CONSTANT.CURRENCY_INPUT.TYPE.ID}`).value,
      amount: Util.findInShadowRoot(this, `#${CONSTANT.CURRENCY_INPUT.AMOUNT.ID}`).value,
    };
  }

  render() {
    return html`
      <div id="currency">
        <div id="inputCurrency">
          <select id="${CONSTANT.CURRENCY_INPUT.TYPE.ID}" @change="${this.currencyChange}">
            <option selected hidden value>--select--</option>
            ${repeat(this._currencyList, currency => html` <option value="${currency.currencyCode}">${currency.currencyName}</option> `)}
          </select>
        </div>
        <div>
          <label>${CONSTANT.CURRENCY_INPUT.AMOUNT.LABEL}</label>
          <input
            autocomplete="off"
            class="form-control"
            id="${CONSTANT.CURRENCY_INPUT.AMOUNT.ID}"
            type="text"
            @blur="${this.blur}"
            @focus="${this.focus}"
            .value="${this.inputAmount}"
          />
        </div>
        <div></div>
      </div>
    `;
  }
}
window.customElements.get('currency-input') || window.customElements.define('currency-input', CurrencyInput);
