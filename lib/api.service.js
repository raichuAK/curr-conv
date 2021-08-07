import * as ENV_CONST from './constant.js';

const getCurrencyConvertorAPIUrl = () => {
  return window.PROD_MODE ? ENV_CONST.CURRENCY_CONVERTOR_API_LIVE_PROD :  ENV_CONST.CURRENCY_CONVERTOR_API_LIVE;
};

const getApiKey = () => {
   return window.PROD_MODE ? ENV_CONST.API_ACCESS_KEY_PROD :  ENV_CONST.API_ACCESS_KEY;
};

export async function getCurrencyRate(...currencies) {
  const fetchUrl = `${getCurrencyConvertorAPIUrl()}?access_key=${getApiKey()}&currencies=${currencies}`;
  const apiResp = await fetch(fetchUrl);
  const jsonResp = apiResp.json();
  return jsonResp;
}
