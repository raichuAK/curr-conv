import { MyElement } from './static/js/view';
import { CurrencyInput } from './static/comp/currency-input';

window.customElements.get('my-element') ||
  window.customElements.define('my-element', MyElement);

window.customElements.get('currency-input') ||
  window.customElements.define('currency-input', CurrencyInput);
