import { CURRENCY_LIST } from './currencies.js';


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

