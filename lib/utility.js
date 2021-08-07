import { getCurrencyRate, normalizeForFreePlan } from './api.service';


export async function convertAmount( amount, currentCurrency = 'USD', targetCurrency = 'USD' ) {
  if (amount < 1 ) {
    return 0;
  } else {
    const currRate = await getCurrencyRate(currentCurrency, targetCurrency);
    const rate = await normalizeForFreePlan();
    return amount * currRate;
  }
}

export async function convertToDisplay(amount, currency = 'EUR', locale = 'nl-NL') {
  const formattter = new Intl.NumberFormat(locale, { currency: currency , minimumFractionDigits : 4 });
  return formattter.format(amount);
}

export function findInShadowRoot(rootElement, selector) {
  return rootElement.shadowRoot.querySelector(selector);
}