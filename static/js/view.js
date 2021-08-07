import { LitElement, html } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import * as Service from '../../lib/service';

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

  // async setCurrencyList() {
  //   this._currencyList = [];
  //   try {
  //     this._currencyList = await Service.modelCurrencyList();
  //   }catch(error) {
  //     this._blockingError = true;
  //     this._blockError = {
  //       severity: 1,
  //       message : error,
  //     };
  //     console.error(`Error occured while getting currency list `, error);
  //   }
  // }

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
      <div class="transferMoney">
        <div id="fromCurrency">
          <div id="inputAmount1">
            <label>Enter your amount</label>
            <input id="enteredAmount1" type="number" value="1000" class="form-control" autocomplete="off"/>
          </div>
          <div id="inputCurrency">
            <select id="selectCurrency1">
              <option selected hidden value>--select--</option>
              ${repeat(
                this._currencyList,
                currency => html` <option value="${currency.currencyCode}">${currency.currencyName}</option> `,
              )}
            </select>
          </div>
        </div>
        <div id="toCurrency">
          <div id="inputAmount2">
            <label>Amount converted</label>
            <input id="enteredAmount2" type="text" class="form-control" autocomplete="off"/>
          </div>
          <div id="inputCurrency">
            <select id="selectCurrency2">
              <option selected hidden value>--select--</option>
              ${repeat(
                this._currencyList,
                currency => html` <option value="${currency.currencyCode}">${currency.currencyName}</option> `,
              )}
            </select>
        </div>
      </div>
    `;
  }
}
window.customElements.get('my-element') ||
  window.customElements.define('my-element', MyElement);
