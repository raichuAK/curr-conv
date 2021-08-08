import * as ENV_CONST from './constant';

const getCurrencyConvertorAPIUrl = () => (window.PROD_MODE ? ENV_CONST.CURRENCY_CONVERTOR_API_LIVE_PROD : ENV_CONST.CURRENCY_CONVERTOR_API_LIVE);

const getApiKey = () => (window.PROD_MODE ? ENV_CONST.API_ACCESS_KEY_PROD : ENV_CONST.API_ACCESS_KEY);

export async function getCurrencyRate(...currencies) {
  const fetchUrl = `${getCurrencyConvertorAPIUrl()}?access_key=${getApiKey()}&currencies=${currencies}`;
  const apiResp = await fetch(fetchUrl);
  const jsonResp = await apiResp.json();
  if (jsonResp.success === true) {
    return { base: jsonResp.source, targets: jsonResp.quotes };
  }
  throw new Error(`Conversion failed for currencies ${currencies} with response as ${jsonResp}`);
}

export async function normalizeForFreePlan(currencies, conversions, base = 'USD') {
  const sourceCurrency = conversions[`${base}${currencies[0]}`];
  const targetCurrency = conversions[`${base}${currencies[1]}`];
  return targetCurrency / sourceCurrency;
}
