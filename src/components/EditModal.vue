<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title fs-5" id="exampleModalLabel">Edit Product</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-4">
                    <input type="text" placeholder="請輸入圖片網址" class="mb-3 w-100" v-model="imageUrl">
                    <img :src="imageUrl" alt="edit product pic" class="object-fit-cover w-100" v-if="imageUrl">
                    <img :src="tempProduct.imageUrl" alt="product pic" class="object-fit-cover w-100" v-if="!imageUrl">
                </div>
                <div class="col-8">
                    <div class="mb-3 d-flex">
                        <label for="title" class="d-flex align-items-center">Title：</label>
                        <input type="text" id="title" class="w-100" v-model="tempProduct.title">
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="mb-3 d-flex">
                                <label for="category" class="d-flex align-items-center">Category：</label>
                                <input type="text" id="category" class="w-100" v-model="tempProduct.category">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3 d-flex">
                                <label for="unit" class="d-flex align-items-center">Unit：</label>
                                <input type="text" id="unit" class="w-100" v-model="tempProduct.unit">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="mb-3 d-flex">
                                <label for="origin_price" class="d-flex align-items-center">Origin_price：</label>
                                <input type="text" id="origin_price" class="w-100" v-model="tempProduct.origin_price">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3 d-flex">
                                <label for="price" class="d-flex align-items-center">Price：</label>
                                <input type="text" id="price" class="w-100" v-model="tempProduct.price">
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 d-flex">
                        <label for="content" class="d-flex align-items-center">Content：</label>
                        <input type="text" id="content" class="w-100" v-model="tempProduct.content">
                    </div>
                    <div class="mb-3">
                        <label for="description" class="d-flex align-items-center">Description：</label>
                        <textarea name="description" class="w-100" id="" cols="30" rows="5" v-model="tempProduct.description"></textarea>
                    </div>
                    <div class="mb-3 d-flex">
                        <input type="radio" id="is_enabled" class="me-2"><label for="is_enabled">啟用</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
import MixinModal from '../assets/js/mixins/mixinModal.js';
export default {
    data(){
        return {
            tempProduct: {},
            imageUrl: '',
        }
    },
    mixins: [MixinModal],
    props: {
        editModal: {
            typeof: Object,
            default() {return {}; }
        }
    },
    watch: {
        editModal(){
            this.tempProduct = this.editModal;
            console.log(this.tempProduct);
        },
    },
    methods: {
        
    },
    mounted(){
        
    }
}
</script>