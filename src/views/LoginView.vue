<template>
  <div class="login">
    <div class="container">
      <h1 class="my-3">Login page</h1>
    </div>
    <div class="container" v-if="!loginState">
      <v-form @submit="onSubmit" class="row g-3 needs-validation flex-column align-items-center" novalidate v-slot="{errors}">
        <div class="col-md-4 mb-3">
          <label for="username" class="form-label">Email address</label>
          <v-field type="email" name="Email Address" class="form-control" id="username" placeholder="name@example.com" :class="{'is-invalid': errors['Email Address']}" rules="required|email" v-model="user.username"></v-field>
          <error-message class="invalid-feedback" name="Email Address"></error-message>
        </div>
        <div class="col-md-4 mb-3">
          <label for="password" class="form-label">Password</label>
          <v-field type="password" name="Password" class="form-control" id="password" placeholder="請輸入密碼" :class="{'is-invalid': errors.Password}" rules="required" v-model="user.password"></v-field>
          <error-message class="invalid-feedback" name="Password"></error-message>
        </div>
        <div class="col-md-4">
          <button class="btn btn-primary w-100" type="submit">Login</button>
        </div>
      </v-form>
    </div>
  </div>
</template>
<script>
const apiUrl=import.meta.env.VITE_API;
const apiPath=import.meta.env.VITE_PATH;
// vee-validate 
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email,regex } from '@vee-validate/rules';
defineRule('required', required);
defineRule('email', email);
defineRule('regex', regex);
import { localize, setLocale } from '@vee-validate/i18n';
// 下載語言
import zh_TW from '@vee-validate/i18n/dist/locale/zh_TW.json';

setLocale('zh_TW');
configure({
  // Generates an English message locale generator
  generateMessage: localize({zh_TW}),
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
export default {
  data(){
    return {
      user:{
        username: '',
        password: '',
      },
    }
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage,
  },
  props: ['loginState'],
  methods: {
    onSubmit(){
      this.login();
    },
    async login(){
      try {
        this.$emit('emit-toggleLoading');
        const result= (await this.axios.post(`${apiUrl}v2/admin/signin`,this.user)).data;
        const sweetConfig={
          icon: 'success',
          title: result.message,
          timer: 1500
        }
        this.$swal(sweetConfig);
        const token = result.token;
        document.cookie=`hexToken=${token};expires=${new Date(result.expired)}`;
        this.user.username='';
        this.user.password='';
        this.$emit('emit-toggleLoading');
        this.checkLogin();
      } catch (err) {
        console.log(err);
        const sweetConfig={
          icon: 'error',
          title: err.response.data.message,
        }
        this.$swal(sweetConfig);
        this.$emit('emit-toggleLoading');
      }
    },
    async checkLogin(){
      try {
        this.$emit('emit-toggleLoading');
        const token=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1",);
        this.axios.defaults.headers.common['Authorization'] = token;
        const result=(await this.axios.post(`${apiUrl}v2/api/user/check`)).data;
        this.$emit('emit-toggleLogin');
        this.$emit('emit-toggleLoading');
      } catch (err) {
        console.log(err);
        this.$emit('emit-toggleLoading');
        const sweetConfig={
          icon: 'error',
          title: err.response.data.message,
        }
        this.$swal(sweetConfig);
      }
    },
  },
  created(){
    this.$emit('emit-login');
  },
  mounted(){
    
  }
}

</script>
<style lang="scss">

</style>
