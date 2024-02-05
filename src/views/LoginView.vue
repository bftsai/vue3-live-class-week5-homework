<template>
  <div class="login">
    <div class="container">
      <h1 class="my-3">Login page</h1>
    </div>
    <div class="container" v-if="!loginState">
      <v-form @submit="onSubmit" class="row g-3 needs-validation flex-column align-items-center"
      novalidate v-slot="{errors}">
        <div class="col-md-4 mb-3">
          <label for="username" class="form-label">Email address</label>
          <v-field type="email" name="Email Address" class="form-control" id="username"
          placeholder="name@example.com" :class="{'is-invalid': errors['Email Address']}"
          rules="required|email" v-model="user.username"></v-field>
          <error-message class="invalid-feedback" name="Email Address"></error-message>
        </div>
        <div class="col-md-4 mb-3">
          <label for="password" class="form-label">Password</label>
          <v-field type="password" name="Password" class="form-control" id="password"
          placeholder="請輸入密碼" :class="{'is-invalid': errors.Password}"
          rules="required" v-model="user.password"></v-field>
          <error-message class="invalid-feedback" name="Password"></error-message>
        </div>
        <div class="col-md-4">
          <button class="btn w-100"
          :class="{'btn-secondary': defaultTheme==='light','btn-primary': defaultTheme==='dark'}"
          type="submit">Login</button>
        </div>
      </v-form>
    </div>
  </div>
</template>
<script>
// vee-validate
import mixinValidate from '@/assets/js/mixins/mixinValidate';
import mixinSwal from '@/assets/js/mixins/mixinSwal';

const apiUrl = import.meta.env.VITE_API;

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  mixins: [mixinValidate, mixinSwal],
  props: ['loginState', 'defaultTheme'],
  methods: {
    onSubmit() {
      this.login();
    },
    async login() {
      try {
        this.$emit('emit-toggleLoading');
        const result = (await this.axios.post(`${apiUrl}v2/admin/signin`, this.user)).data;
        this.showSuccess(result.message);
        const { token } = result;
        document.cookie = `hexToken=${token};expires=${new Date(result.expired)}`;
        this.user.username = '';
        this.user.password = '';
        this.$emit('emit-toggleLoading');
        await this.checkLogin();
        this.$router.push('productsAdnin');
      } catch (err) {
        console.log(err);
        this.showError(err.response.data.message);
        this.$emit('emit-toggleLoading');
      }
    },
    async logOut() {
      try {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        this.axios.defaults.headers.common.Authorization = token;
        const result = (await this.axios.post(`${apiUrl}v2/logout`)).data;
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    },
    async checkLogin() {
      try {
        this.$emit('emit-toggleLoading');
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)someCookieName\s*=\s*([^;]*).*$)|^.*$/, '$1');
        this.axios.defaults.headers.common.Authorization = token;
        const result = (await this.axios.post(`${apiUrl}/v2/api/user/check`)).data;
        if (result.success) {
          this.$emit('emit-toggleLogin', result.success);
        }
        this.$emit('emit-toggleLoading');
      } catch (err) {
        this.$emit('emit-toggleLogin', err.response.data.success);
        this.$emit('emit-toggleLoading');
      }
    },
  },
  mounted() {
    this.$emit('emit-login');
    this.checkLogin();
  },
};

</script>
<style lang="scss">

</style>
@/mixins/mixinValidate@/mixins/mixinSwal@/mixins/mixinValidate@/mixins/mixinSwal