import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import { required, email, regex } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
// 下載語言
import zhTw from '@vee-validate/i18n/dist/locale/zh_TW.json';

defineRule('required', required);
defineRule('email', email);
defineRule('regex', regex);
setLocale('zhTw');
configure({
  // Generates an English message locale generator
  generateMessage: localize({ zhTw }),
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
export default {
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage,
  },
};
