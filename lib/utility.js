import { getCurrencyRate, normalizeForFreePlan } from './api.service';

const DEFAULT_LOCALE = 'en-GB';

export async function convertAmount( amount, currentCurrency = 'USD', targetCurrency = 'USD' ) {
  if (amount < 1 ) {
    return 0;
  } else {
    const currRate = await getCurrencyRate(currentCurrency, targetCurrency);
    const rate = await normalizeForFreePlan([currentCurrency, targetCurrency], currRate.targets, currRate.base);
    return amount * rate;
  }
}

export async function convertToDisplay(amount, locale, currency = 'EUR') {
  const formattter = new Intl.NumberFormat(locale || DEFAULT_LOCALE , { currency: currency , minimumFractionDigits : 4 });
  return formattter.format(amount);
}

export function findInShadowRoot(rootElement, selector) {
  return rootElement.shadowRoot.querySelector(selector);
}

export async function reverseFormatNumber(val, inpLocale){
  const locale = inpLocale || DEFAULT_LOCALE;
  var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, '');
  var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, '');
  var reversedVal = val.replace(new RegExp('\\' + group, 'g'), '');
  reversedVal = reversedVal.replace(new RegExp('\\' + decimal, 'g'), '.');
  return Number.isNaN(reversedVal)? 0 : reversedVal;
}