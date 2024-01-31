<template>
    <div class="container">
        <h1>商品列表</h1>
        <div class="row">
            <div class="col-md-8">
              <p class="d-flex align-items-center"
              :class="{'text-primary': defaultTheme === 'dark'}">產品分類：
                <select name="" id="" class="form-select w-auto" @change="changeCategory"
                :class="{'text-primary': defaultTheme === 'dark'}">
                  <option selected disabled>請選擇類別</option>
                  <option value="全部">全部</option>
                  <option :value="item" v-for="item in categoryArr" :key="item">{{ item }}</option>
                </select>
              </p>
              <table class="table">
                <thead>
                  <tr>
                  <th scope="col">圖片</th>
                  <th scope="col">商品名稱</th>
                  <th scope="col">價格</th>
                  <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,key) in products" :key="item.id">
                    <td><img :src="item.imageUrl" :alt="item.title + 'pic'"
                        class="object-fit-cover"></td>
                    <td class="w-25">{{ item.title }}</td>
                    <td>
                      <p class="line-through">原價：${{ item.origin_price }}</p>
                      <p class="fs-lg-4">現在只要：${{ item.price }}</p>
                    </td>
                    <td>
                        <div class="d-flex justify-content-center">
                          <button class="btn btn-outline-secondary  me-3"
                          @click="checkProduct(item, $event)" :data-num="key">查看更多</button>
                          <button class="btn btn-outline-danger"
                          @click="postCart(item.id)">加到購物車</button>
                        </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <PaginationComponent :pagination-obj="paginationObj"
              @emit-selectPage="getProducts" :default-theme="defaultTheme"></PaginationComponent>
            </div>
            <ProductCard :item-select="itemSelect" :click-item-num="clickItemNum"
            :default-theme="defaultTheme" v-show="itemSelect.id"></ProductCard>
        </div>
    </div>
    <div class="py-5" :class="{'bg-light': defaultTheme === 'light'}">
      <div class="container">
        <div class="row position-relative">
          <div class="col-md-8">
            <loading class="pr-5" v-model:active="isLoading" :opacity="0.5"
            :is-full-page="false" :loader="'spinner'"
            :color="'#ff0000'" :weight="30" :height="30"
            :lock-scroll="true"/>
            <button class="btn btn-outline-danger d-block ms-auto w-auto mb-3"
            @click="deleteCarts">清空購物車</button>
            <table class="table table-hover mb-0"
            :class="{'table-light': defaultTheme === 'light'}">
                <thead>
                    <tr>
                    <th scope="col">品名</th>
                    <th class="text-center" scope="col">數量/單位</th>
                    <th class="text-center" scope="col">單價</th>
                    <th class="text-center" scope="col">刪除</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in carts" :key="item.id">
                        <td>{{ item.product.title }}</td>
                        <td>
                            <div class="d-flex justify-content-center">
                                <input type="number" v-model="item.qty"
                            @change="putCart(item.id, item.qty)" min="1">
                            &ensp;/ {{ item.product.unit }}
                            </div>
                        </td>
                        <td class="text-center">{{ item.product.origin_price }}</td>
                        <td>
                            <div class="d-flex justify-content-center">
                                <button type="button" class="btn btn-outline-danger"
                                @click="deleteCart(item.id)">
                                刪除</button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="total">
                        <td class="text-end" colspan="3">總計</td>
                        <td class="text-end">{{ total }}</td>
                    </tr>
                    <tr v-if="discount">
                        <td class="text-end" colspan="3">折扣價</td>
                        <td class="text-end">{{ discount }}</td>
                    </tr>
                    <tr>
                      <td class="text-center fw-bold text-danger"
                      colspan="4" v-if="!total">購物車沒有東西！！！</td>
                    </tr>
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="container py-5">
      <v-form class="row g-3" v-slot="{ errors }" @submit="postOrder"
      :class="{'text-primary': defaultTheme === 'dark'}">
            <div class="col-md-8">
                <label for="email" class="form-label required">
                  Email
                </label>
                <v-field type="text" name="email" class="form-control"
                :class="{'is-invalid': errors.email}"
                rules="required|email" id="email" v-model="orderData.data.user.email"></v-field>
                <error-message class="invalid-feedback" name="email"></error-message>
            </div>
            <div class="col-md-8">
                <label for="name" class="form-label required">收件人姓名</label>
                <v-field type="text" name="name" class="form-control"
                :class="{'is-invalid': errors.name}"
                rules="required" id="name" v-model="orderData.data.user.name"></v-field>
                <error-message class="invalid-feedback" name="name"></error-message>
            </div>
            <div class="col-md-8">
                <label for="phone" class="form-label required">收件人電話</label>
                <v-field type="text" name="phone" class="form-control"
                :class="{'is-invalid': errors.phone}"
                :rules="isPhoneNum" id="phone" v-model="orderData.data.user.tel"></v-field>
                <error-message class="invalid-feedback" name="phone"></error-message>
            </div>
            <div class="col-md-8">
                <label for="address" class="form-label required">收件人地址</label>
                <v-field type="text" name="address" class="form-control"
                :class="{'is-invalid': errors.address}"
                rules="required" id="address" v-model="orderData.data.user.address"></v-field>
                <error-message class="invalid-feedback" name="address"></error-message>
            </div>
            <div class="col-md-8">
                <label for="message" class="form-label">留言</label>
                <textarea name="message" id="message"
                class="form-control" cols="30" rows="5" v-model="orderData.data.message"></textarea>
            </div>
            <div class="col-md-8 d-flex justify-content-end">
                <button class="btn btn-outline-danger" type="submit">送出訂單</button>
            </div>
      </v-form>
    </div>
</template>
<script>
import Loading from 'vue3-loading-overlay';
import mixinValidation from '../assets/js/mixins/mixinValidate';
import mixinSwal from '../assets/js/mixins/mixinSwal';

import PaginationComponent from '../components/PaginationComponent.vue';
import ProductCard from '../components/ProductCard.vue';

const apiUrl = import.meta.env.VITE_API;
const apiPath = import.meta.env.VITE_PATH;
export default {
  data() {
    return {
      paginationObj: {},
      products: [],
      categoryArr: [],
      categorySelect: '',
      total: 0,
      discount: 0,
      itemSelect: {},
      clickItemNum: 0,
      carts: [],
      isLoading: false,
      orderData: {
        data: {
          user: {
            name: '',
            email: '',
            tel: '',
            address: '',
          },
          message: '',
        },
      },
    };
  },
  mixins: [mixinValidation, mixinSwal],
  props: ['defaultTheme', 'loginState'],
  emits: ['emitLogin', 'emitToggleLogin', 'emitToggleLoading'],
  components: {
    PaginationComponent,
    ProductCard,
    Loading,
  },
  methods: {
    isPhoneNum(value) {
      const reg = /^09\d{8}$/;
      if (value && value !== null && value !== undefined) {
        return reg.test(value);
      }
      return false;
    },
    async getAllProducts() {
      try {
        const result = (await this.axios.get(`${apiUrl}/v2/api/${apiPath}/products/all`)).data;
        result.products.forEach((item) => {
          if (!this.categoryArr.includes(item.category)) {
            this.categoryArr.push(item.category);
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    async getProducts(page = 1) {
      try {
        this.$emit('emitToggleLoading');
        const result = (await this.axios.get(`${apiUrl}v2/api/${apiPath}/products?page=${page}&category=${this.categorySelect}`)).data;
        this.$emit('emitToggleLoading');
        this.paginationObj = result.pagination;
        this.products = result.products;
      } catch (err) {
        console.log(err);
      }
    },
    async changeCategory(e) {
      try {
        if (e.target.value === '全部') {
          this.categorySelect = '';
          this.getProducts();
        } else {
          this.$emit('emitToggleLoading');
          this.categorySelect = e.target.value;
          const result = (await this.axios.get(`${apiUrl}v2/api/${apiPath}/products?category=${this.categorySelect}`)).data;
          this.$emit('emitToggleLoading');
          this.products = result.products;
          this.paginationObj = result.pagination;
        }
      } catch (err) {
        this.$emit('emitToggleLoading');
        console.log(err);
      }
    },
    checkProduct(product, e) {
      if (this.itemSelect.id === product.id) {
        return;
      }
      this.clickItemNum = e.target.dataset.num;
      this.itemSelect = product;
    },
    async getAllCarts() {
      try {
        const result = (await this.axios(`${apiUrl}/v2/api/${apiPath}/cart`)).data.data.carts;
        this.total = 0;
        this.discount = 0;
        result.forEach((item) => {
          this.total += item.qty * item.product.origin_price;
          this.discount += item.qty * item.product.price;
        });
        this.carts = result;
      } catch (err) {
        console.log(err);
      }
    },
    async postCart(id) {
      try {
        const obj = {
          data: {
            product_id: id,
            qty: 1,
          },
        };
        this.$emit('emitToggleLoading');
        const result = (await this.axios.post(`${apiUrl}/v2/api/${apiPath}/cart`, obj)).data;
        this.$emit('emitToggleLoading');
        if (result.success) {
          this.showSuccess(result.message);
        } else {
          this.showError(result.message);
        }
        this.getAllCarts();
      } catch (err) {
        console.log(err);
      }
    },
    async putCart(id, num) {
      try {
        const obj = {
          data: {
            product_id: id,
            qty: Number(num.toFixed(0)),
          },
        };
        this.$emit('emitToggleLoading');
        const result = (await this.axios.put(`${apiUrl}/v2/api/${apiPath}/cart/${id}`, obj)).data;
        this.$emit('emitToggleLoading');
        if (result.success) {
          this.getAllCarts();
          this.showSuccess(result.message);
        } else {
          this.showError(result.message);
        }
      } catch (err) {
        this.$emit('emitToggleLoading');
        console.log(err);
      }
    },
    async deleteCart(id) {
      try {
        this.isLoading = true;
        const result = (await this.axios.delete(`${apiUrl}/v2/api/${apiPath}/cart/${id}`)).data;
        this.isLoading = false;
        if (result.success) {
          this.showSuccess(result.message);
        } else {
          this.showError(result.message);
        }
        this.getAllCarts();
      } catch (err) {
        console.log(err);
        this.isLoading = false;
      }
    },
    async deleteCarts() {
      try {
        if (!this.carts.length) {
          this.showError('購物車沒有商品');
          return;
        }
        this.isLoading = true;
        const result = (await this.axios.delete(`${apiUrl}/v2/api/${apiPath}/carts`)).data;
        this.isLoading = false;
        if (result.success) {
          this.showSuccess(result.message);
        } else {
          this.showError(result.message);
        }
        this.getAllCarts();
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },
    async postOrder() {
      try {
        if (!this.carts.length) {
          this.showError('購物車沒有商品');
          return;
        }
        this.$emit('emitToggleLoading');
        const result = (await this.axios.post(`${apiUrl}/v2/api/${apiPath}/order`, this.orderData)).data;
        this.$emit('emitToggleLoading');
        if (result.success) {
          this.showSuccess(result.message);
        } else {
          this.showError(result.message);
        }
        this.getAllCarts();
      } catch (err) {
        this.$emit('emitToggleLoading');
        console.log(err);
      }
    },
  },
  mounted() {
    this.$emit('emitLogin');
    this.$emit('emitToggleLogin', true);
    this.getProducts();
    this.getAllCarts();
    this.getAllProducts();
  },
};
</script>
<style lang="scss">
img{
  width: 150px;
  height: 150px;
}
label.required::before{
  content: '* ';
  color: #ff0000;
}
</style>
