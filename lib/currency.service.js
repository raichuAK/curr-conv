import { CURRENCY_LIST } from './currencies';
import * as Util from './utility';

async function getCurrencies() {
  return Promise.resolve(CURRENCY_LIST);
}

export async function modelCurrencyList() {
  const modelCurrList = [];
  const currListObj = await getCurrencies();
  Object.values(currListObj).forEach(value => {
    const currency = {
      currencyName: value.name_plural,
      currencySymbol: value.symbol,
      currencyCode: value.code,
    };
    modelCurrList.push(currency);
  });
  return modelCurrList;
}

export async function calculateTargetValue(amountText, sourceCurrency, targetCurrency) {
  let convAmountDisplay = 0;
  const amount = Number(amountText);
  if (!Number.isNaN(amount) && amount > 1 && sourceCurrency && targetCurrency) {
    const convAmount = await Util.convertAmount(amount, sourceCurrency, targetCurrency);
    convAmountDisplay = await Util.convertToDisplay(convAmount, document.documentElement.lang, targetCurrency);
  }
  return convAmountDisplay;
}
