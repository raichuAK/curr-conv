import { LitElement, html } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import * as Service from '../../lib/service';
import * as Util from '../../lib/utility';

export class MyElement extends LitElement {

  static get properties() {
    return {
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

  setTargetAmountState() {
      Util.findInShadowRoot(this, `#enteredAmount2`).type = 'text';
      Util.findInShadowRoot(this, `#enteredAmount2`).value = this.enteredAmountSecond;
  }

  async currencyChange(event) {
    let currentCurrency = '';
    let targetCurrency = '';
    try {
      const selectCurrency1Val = Util.findInShadowRoot(this, `#selectCurrency1`).value;
      const selectCurrency2Val = Util.findInShadowRoot(this, `#selectCurrency2`).value;

      if(event.target.value !== selectCurrency1Val) {
        currentCurrency = selectCurrency1Val;
      } else if(event.target.value !== selectCurrency2Val) {
        currentCurrency = selectCurrency2Val;
      }
      targetCurrency = event.target.value;
      const enteredAmountFirst = Util.findInShadowRoot(this, `#enteredAmount1`).value;
      if (enteredAmountFirst > 1 && currentCurrency && targetCurrency) {
          const convAmount = await Util.convertAmount(enteredAmountFirst, currentCurrency, targetCurrency);
          this.enteredAmountSecond = await Util.convertToDisplay(convAmount, targetCurrency, document.documentElement.lang);
          this.setTargetAmountState();
      }
      this._blockingError = false;
    }catch(error) {
      this._blockingError = true;
      console.error(`Error occured while doing currency exchange `, error);
    }
  }

  render() {
    return html`
      <div class="transferMoney container-fluid">
        <div id="currency1">
          <currency-input
            @currency-amount-change="${this.currencyChange}"
          ></currency-input>
        </div>
        <div id="currency2">
          <currency-input
            @currency-amount-change="${this.currencyChange}"
          ></currency-input>
        </div>
      </div>
    `;
  }
}
window.customElements.get('my-element') ||
  window.customElements.define('my-element', MyElement);
