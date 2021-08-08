import { CurrencyConvertor } from './static/js/CurrencyConvertor';
import { CurrencyInput } from './static/comp/CurrencyInput';

window.customElements.get('currency-convertor') || window.customElements.define('currency-convertor', CurrencyConvertor);

window.customElements.get('currency-input') || window.customElements.define('currency-input', CurrencyInput);
