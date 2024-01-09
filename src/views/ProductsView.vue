<template>
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <h1>Products List</h1>
          <table class="table table-hover">
            <thead>
              <tr class="text-center">
                <th scope="col">產品名稱</th>
                <th scope="col">原價</th>
                <th scope="col">售價</th>
                <th scope="col">是否啟用</th>
                <th scope="col">查看細節</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in products" :key="item.title" class="text-center">
                <td>{{ item.title }}</td>
                <td>{{ item.origin_price }}</td>
                <td>{{ item.price }}</td>
                <td :class="{'text-light': !item.is_enabled}">{{ item.is_enabled? '啟用':'未啟用' }}</td>
                <td><button type="button" class="btn btn-primary w-100" @click="checkProduct(item)">查看細節</button></td>
              </tr>
            </tbody>
          </table>
          <pagination :pagination-obj="paginationObj"></pagination>
        </div>
        <div class="col-lg-6" v-if="itemSelect.id">
          <h2>Product</h2>
          <div class="card border-primary mb-3">
            <img :src="itemSelect.imageUrl" class="card-img-top object-fit-contain" :alt="itemSelect.title" height="400">
            <div class="card-body">
              <h5 class="card-title">{{ itemSelect.title }}<span class="badge text-bg-primary ms-3">{{ itemSelect.category }}</span></h5>
              <p class="card-text">商品內容：{{ itemSelect.content }}</p>
              <p class="card-text">商品描述：{{ itemSelect.description }}</p>
              <p class="card-text">{{ itemSelect.price }} <span class="line-through text-light">{{ itemSelect.origin_price }}</span>元 / 個</p>
            </div>
          </div>
          <div class="d-flex mb-3">
            <img :src="pic" :alt="'小圖' + key" v-for="(pic,key) in itemSelect.imagesUrl" :key="'小圖' + key" height="200" class="me-3">
          </div>
        </div>
      </div>
      
    </div>
</template>
<script>
const apiUrl=import.meta.env.VITE_API;
const apiPath=import.meta.env.VITE_PATH;
import pagination from '../components/Pagination.vue';
export default {
  data(){
    return {
      products: [],
      paginationObj: {},
      itemSelect: {},
    }
  },
  components: {
    pagination,
  },
  methods: {
    async getProducts(page){
      try {
        this.$emit('emit-toggleLoading');
        const token=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1",);
        this.axios.defaults.headers.common['Authorization'] = token;
        const result = (await this.axios.get(`${apiUrl}v2/api/${apiPath}/admin/products`,page)).data;
        this.products=result.products;
        this.paginationObj=result.pagination;
        this.$emit('emit-toggleLoading');
        const sweetConfig={
          icon: 'success',
          title: '已取得產品資料',
          timer: 1500
        }
        this.$swal(sweetConfig);
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
    checkProduct(product){
      this.itemSelect=JSON.parse(JSON.stringify(product));
    },
    async postProduct(){
      try {
        const data={
            "data": {
            "title": "杯子蛋糕",
            "category": "蛋糕",
            "origin_price": 100,
            "price": 50,
            "unit": "個",
            "description": "呈現經典的美味及口感。",
            "content": "尺寸：2寸",
            "is_enabled": 0,
            "imageUrl": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D",
            "imagesUrl": [
            "https://plus.unsplash.com/premium_photo-1678310877551-396c3953c79e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3VwJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1586985290301-8db40143d525?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VwJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1613452707901-21b3fd7f7e5b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3VwJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D"
            ]
          }
        };
        const result= (await this.axios.post(`${apiUrl}v2/api/${apiPath}/admin/product`,data));
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    },
    async checkLogin(){
      try {
        this.$emit('emit-toggleLoading');
        const token=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1",);
        this.axios.defaults.headers.common['Authorization'] = token;
        const result=(await this.axios.post(`${apiUrl}v2/api/user/check`)).data;
        if(result.success){
          this.$emit('emit-toggleLogin',result.success);
          this.getProducts(1);
        }
        this.$emit('emit-toggleLoading');
      } catch (err) {
        this.$emit('emit-toggleLogin',err.response.data.success);
        const sweetConfig={
          icon: 'error',
          title: err.response.data.message,
          timer: 1500,
        }
        this.$swal(sweetConfig);
        this.$emit('emit-toggleLoading');
        if(!err.response.data.success){
          this.$router.push('login');
        }
      }
    },
  },
  created(){
    this.$emit('emit-login');
    this.checkLogin();
    // this.getProducts(1);
  },
}
</script>
<style lang="scss">
tbody{
  td{
    line-height: 2.375rem;
  }
}
.line-through{
  text-decoration: line-through;
}
</style>