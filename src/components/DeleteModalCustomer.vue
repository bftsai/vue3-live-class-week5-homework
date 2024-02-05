<template>
    <div class="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
        <div class="modal-header bg-danger">
            <h5 class="modal-title fs-5" id="exampleModalLabel">Delete Product</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="hideModal"></button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-4">
                    <div class="row">
                        <div class="col-12 mb-3 d-flex flex-wrap justify-content-between">
                            <img class="object-fit-cover w-50 mb-3"
                            :src="tempProduct.imageUrl" alt="imageUrl">
                            <img class="object-fit-cover w-50 mb-3"
                            :src="img" alt="'imagesUrl' + key"
                            v-for="(img,key) in tempProduct.imagesUrl"
                            :key="'imagesUrl' + key">
                        </div>
                    </div>
                </div>
                <div class="col-8">
                    <div class="mb-3 d-flex align-items-center">
                        <p>Title：{{ tempProduct.title }}</p>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="mb-3 d-flex align-items-center">
                                <p>Category：{{ tempProduct.category }}</p>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3 d-flex align-items-center">
                                <p>Unit：{{ tempProduct.unit }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="mb-3 d-flex align-items-center">
                                <p>origin_price：{{ tempProduct.origin_price }}</p>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3 d-flex align-items-center">
                                <p>Price：{{ tempProduct.price }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 d-flex align-items-center">
                        <p>Content：{{ tempProduct.content }}</p>
                    </div>
                    <div class="mb-3">
                        <div class="w-100">
                            <p>Description：{{ tempProduct.description }}</p>
                        </div>
                    </div>
                    <div class="mb-3 d-flex align-items-center">
                        <p class="text-success"
                        :class="{'text-danger': !tempProduct.is_enabled}">
                        {{ tempProduct.is_enabled? '啟用' : '未啟用' }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
            @click="hideModal">Close</button>
            <button type="submit" class="btn btn-outline-danger"
            @click="deleteProduct">Delete Product</button>
        </div>
        </div>
    </div>
    </div>
</template>
<script>
import MixinModal from '@/mixins/mixinModal';
import mixinSwal from '../mixins/mixinSwal';

const apiUrl = import.meta.env.VITE_API;
const apiPath = import.meta.env.VITE_PATH;
export default {
  data() {
    return {
      tempProduct: {},
    };
  },
  props: {
    deleteModalCustomer: {
      typeof: Object,
      default() { return {}; },
    },
  },
  mixins: [MixinModal, mixinSwal],
  watch: {
    deleteModalCustomer() {
      this.tempProduct = { ...this.deleteModalCustomer.product };
    },
  },
  methods: {
    async deleteProduct() {
      try {
        this.$emit('emit-toggleLoading');
        const result = (await this.axios.delete(`${apiUrl}/v2/api/${apiPath}/cart/${this.deleteModalCustomer.id}`)).data;
        this.$emit('emit-toggleLoading');
        if (result.success) {
          this.showSuccess(result.message);
        } else {
          this.showError(result.message);
        }
        this.hideModal();
      } catch (err) {
        console.log(err);
        this.isLoading = false;
      }
    },
  },
};
</script>
