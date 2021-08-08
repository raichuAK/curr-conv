import { CURRENCY_LIST } from './currencies.js';
import * as Util from './utility.js';

async function getCurrencies() {
  return Promise.resolve(CURRENCY_LIST);
}

export async function modelCurrencyList() {
  const modelCurrList = [];
  const currListObj = await getCurrencies();
  for (const [key, value] of Object.entries(currListObj)) {
    let currency = {
      currencyName: value.name_plural,
      currencySymbol: value.symbol,
      currencyCode: value.code
    };
    modelCurrList.push(currency);
  }
  return modelCurrList;
}

export async function calculateTargetValue(amountText, sourceCurrency, targetCurrency) {
  let convAmountDisplay = 0;
  const amount = Number(amountText);
  if (!isNaN(amount) && amount > 1 && sourceCurrency && targetCurrency) {
      const convAmount = await Util.convertAmount(amount, sourceCurrency, targetCurrency);
      convAmountDisplay = await Util.convertToDisplay(convAmount, document.documentElement.lang, targetCurrency);
  }
  return convAmountDisplay;    
}
