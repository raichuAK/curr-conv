import { LitElement, html } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import * as Service from '../../lib/service';
import * as Util from '../../lib/utility';

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
          this.enteredAmountSecond = await Util.convertToDisplay(convAmount, targetCurrency);
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
        <div id="currency1"  class="row">
          <div id="inputCurrency1" class="col">
            <select id="selectCurrency1" @change="${this.currencyChange}">
              <option selected hidden value>--select--</option>
              ${repeat(
                this._currencyList,
                currency => html` <option value="${currency.currencyCode}">${currency.currencySymbol} ${currency.currencyName}</option>`,
              )}
            </select>
          </div>
          <div id="inputAmount1" class="col">
            <label>Enter your amount</label>
            <input id="enteredAmount1" type="number" value="1000" class="form-control" autocomplete="off" value="${this.enteredAmountFirst}"/>
          </div>
        </div>
        <div id="currency2">
          <div id="inputCurrency2">
            <select id="selectCurrency2" @change="${this.currencyChange}">
              <option selected hidden value>--select--</option>
              ${repeat(
                this._currencyList,
                currency => html` <option value="${currency.currencyCode}">${currency.currencyName}</option> `,
              )}
            </select>
        </div>
        <div id="inputAmount2">
            <label>Amount converted</label>
            <input id="enteredAmount2" type="number" class="form-control" autocomplete="off" value="${this.enteredAmountSecond}"/>
        </div>
      </div>
    `;
  }
}
window.customElements.get('my-element') ||
  window.customElements.define('my-element', MyElement);
