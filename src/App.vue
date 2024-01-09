<template>
  <div id="loading" class="loadingBlock position-absolute z-1" v-if="loading">
    <img class="position-absolute top-50 start-50 translate-middle" src="./assets/images/loading2.svg" alt="loading pic">
  </div>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div class="container">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link" to="/">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/products">Product</router-link>
              </li>
              <li class="nav-item" v-if="!loginState">
                <router-link class="nav-link" to="/login">Login</router-link>
              </li>
            </ul>
          </div>
          <button class="btn btn-primary" v-if="loginState" @click="signOut">Sign Out</button>
          <router-link class="btn btn-primary" to="/login" v-else-if="!loginState && !isLogin">Login</router-link>
      </div>
    </nav>
  </header>
  <router-view @emit-login="isLoginPage" @emit-toggleLogin="toggleLoginState" @emit-toggleLoading="toggleLoading" :login-state="loginState"></router-view>
</template>
<script>
const apiUrl=import.meta.env.VITE_API;
export default {
  data(){
    return {
      loginState: false,
      loading: false,
      isLogin: false,
    }
  },
  provide(){
    return {
      loginState: this.loginState,
    }
  },
  methods: {
    toggleLoading(){
      this.loading=!this.loading;
    },
    toggleLoginState(boolean){
      this.loginState=boolean;
    },
    isLoginPage(){
      if(location.href.split('/#/')[1]==='login'){
        this.isLogin=true;
      }else{
        this.isLogin=false;
      }
    },
    async signOut(){
      try {
        this.toggleLoading();
        const result=(await this.axios.post(`${apiUrl}v2/logout`)).data;
        this.toggleLoading();
        const sweetConfig={
          icon: 'success',
          title: result.message,
          timer: 1500
        }
        this.$swal(sweetConfig);
        document.cookie=`hexToken=;max-age=0;`;
        this.toggleLoginState();
        this.$router.push('/');
      } catch (err) {
        console.log(err);
        const sweetConfig={
          icon: 'error',
          title: err.response.data.message,
        }
        this.$swal(sweetConfig);
        this.toggleLoading();
      }
    },
  },
  created(){
    
  },
}
</script>
<style lang="scss">
.loadingBlock{
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #0000005b;
}
</style>