import { LitElement, html } from 'lit-element';
import * as Service from '../../lib/service';
import * as Util from '../../lib/utility';
import { default as CONSTANT } from '../../lib/app.constant';

export class CurrencyConvertor extends LitElement {
  constructor() {
    super();
    this.counter = 0;
    this.__setCurrencyList();
  }

  async __setCurrencyList() {
    this._currencyList = [];
    this._currencyList = await Service.modelCurrencyList();
    this.requestUpdate();
  }

  __setTargetAmountState(selector, amount) {
    const amount1 = Util.findInShadowRoot(this, `#${CONSTANT.VIEW.CURRENCY_1.ID}`).getCurrentInstanceValue().amount;
    const amount2 = Util.findInShadowRoot(this, `#${CONSTANT.VIEW.CURRENCY_2.ID}`).getCurrentInstanceValue().amount;
    if (amount1 === 0 || amount1.length === 0) {
      this.amount1 = amount;
    } else if (amount2 === 0 || amount2.length === 0) {
      this.amount2 = amount;
    } else {
      Util.findInShadowRoot(this, selector).inputAmount = amount;
    }
  }

  async currencyChange1(event) {
    try{
      const { source, target } = this.__getSourceAndTarget(`#${CONSTANT.VIEW.CURRENCY_2.ID}`, event);
      if ( source && source.amount && source.currency && target.currency) {
        let sourceAmount;
        if (isNaN(source.amount)) {
          sourceAmount = await Util.reverseFormatNumber(source.amount);
        } else {
          sourceAmount = source.amount;
        }
        const convAmount = await Service.calculateTargetValue(sourceAmount, source.currency, target.currency);
        if (convAmount) {
          this.__setTargetAmountState(`#${CONSTANT.VIEW.CURRENCY_2.ID}`, convAmount);
          this._blockingError = false;
        }
      }
    }catch(error) {
      this._blockingError = true;
      console.error(`Error occured while doing currency exchange in currencyChange1`, error);
    }finally {
      this.requestUpdate();
    }
  }

  async currencyChange2(event) {
    try{
      const { source, target } = this.__getSourceAndTarget(`#${CONSTANT.VIEW.CURRENCY_1.ID}`, event);
      if ( source && source.amount && source.currency && target.currency) {
        let sourceAmount;
        if (isNaN(source.amount)) {
          sourceAmount = await Util.reverseFormatNumber(source.amount);
        } else {
          sourceAmount = source.amount;
        }  
        const convAmount = await Service.calculateTargetValue(sourceAmount, source.currency, target.currency);
        if (convAmount) {
          this.__setTargetAmountState(`#${CONSTANT.VIEW.CURRENCY_1.ID}`, convAmount);
          this._blockingError = false;
        }
      }
    }catch(error) {
      this._blockingError = true; // Error Panel is not yet defined
      console.error(`Error occured while doing currency exchange in currencyChange2`, error);
    }finally {
      this.requestUpdate();
    }
  }

  __getSourceAndTarget(selector, event){
      let source;
      let target;

      const trigger = event.detail;
      const other = Util.findInShadowRoot(this, selector).getCurrentInstanceValue();
      if ( trigger.amount && ( trigger.amount > 0 || trigger.amount.length > 0 )) {
        source = trigger;
        target = other;
      } else if ( other.amount && ( other.amount > 0 || other.amount.length > 0 )) {
        source = other;
        target = trigger;
      }
    return {
      source, target
    };
  }

  render() {
    return html`
      <div class="transferMoney container-fluid">
        <div>
          <currency-input id="${CONSTANT.VIEW.CURRENCY_1.ID}"
            .inputAmount="${this.amount1}"
            @currency-amount-change="${this.currencyChange1}"
          ></currency-input>
        </div>
        <div>
          <currency-input id="${CONSTANT.VIEW.CURRENCY_2.ID}"
            .inputAmount="${this.amount2}"
            @currency-amount-change="${this.currencyChange2}"
          ></currency-input>
        </div>
      </div>
    `;
  }
}
window.customElements.get('my-element') ||
  window.customElements.define('my-element', CurrencyConvertor);
