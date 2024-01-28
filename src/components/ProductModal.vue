<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl">
        <v-form class="modal-content" v-slot="{ errors }" @submit="onSubmit">
        <div class="modal-header">
            <h5 class="modal-title fs-5" id="exampleModalLabel">Edit Product</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-4">
                    <div class="row">
                        <div class="col-12 mb-3 d-flex flex-column">
                            <input type="text" placeholder="請輸入圖片網址" class="form-control" v-model="imageUrl" v-if="!imageUrl">
                            <input type="file" class="disabled" :disabled="disabled" @change="loadFile">
                            <button type="button" class="btn btn-primary me-3">新增</button>
                        </div>
                        <div class="col-12 mb-3 position-relative" v-if="imageUrl">
                            <img :src="imageUrl" alt="edit product pic" class="object-fit-cover w-100">
                            <span class="position-absolute top-0 start-75 translate-middle badge rounded-circle bg-danger me-3" @click="deleteImageUrl">
                                -
                                <span class="visually-hidden">unread messages</span>
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 position-relative">
                            <img :src="tempProduct.imageUrl" alt="'imageUrl'" class="object-fit-cover w-100">
                            <span class="position-absolute top-0 start-75 translate-middle badge rounded-circle bg-danger me-3" @click="deleteTempImage">
                                -
                                <span class="visually-hidden">unread messages</span>
                            </span>
                        </div>
                        <div class="col-6 position-relative" v-for="(pic,key) in tempProduct.imagesUrl" :key="'key' + key ">
                            <img :src="pic" :alt="'imagesUrl' + key" class="object-fit-cover w-100">
                            <span class="position-absolute top-0 start-75 translate-middle badge rounded-circle bg-danger me-3" @click="deleteTempImage">
                                -
                                <span class="visually-hidden">unread messages</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-8">
                    <div class="mb-3 d-flex align-items-center">
                        <label for="title" class="form-label">Title：</label>
                        <div class="w-100 d-flex flex-column">
                            <v-field type="text" id="title" class="form-control" :class="{'is-invalid': errors.Title}" name="Title" v-model="tempProduct.title" rules="required"></v-field>
                            <error-message class="invalid-feedback" name="Title"></error-message>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="mb-3 d-flex align-items-center">
                                <label for="category" class="form-label">Category：</label>
                                <div class="w-100 d-flex flex-column">
                                    <v-field type="text" id="category" class="form-control" :class="{'is-invalid': errors.Category}" name="Category" v-model="tempProduct.category" rules="required"></v-field>
                                    <error-message class="invalid-feedback" name="Category"></error-message>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3 d-flex align-items-center">
                                <label for="unit" class="form-label">Unit：</label>
                                <div class="w-100 d-flex flex-column">
                                    <v-field type="text" id="unit" class="form-control" :class="{'is-invalid': errors.Unit}" name="Unit" v-model="tempProduct.unit" rules="required"></v-field>
                                    <error-message class="invalid-feedback" name="Unit"></error-message>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="mb-3 d-flex align-items-center">
                                <label for="origin_price" class="form-label">Origin_price：</label>
                                <div class="w-100 d-flex flex-column">
                                    <v-field type="text" id="origin_price" class="form-control" :class="{'is-invalid': errors.Origin_price}" name="Origin_price" v-model="tempProduct.origin_price" rules="required"></v-field>
                                    <error-message class="invalid-feedback" name="Origin_price"></error-message>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3 d-flex align-items-center">
                                <label for="price" class="form-label">Price：</label>
                                <div class="w-100 d-flex flex-column">
                                    <v-field type="text" id="price" class="form-control" :class="{'is-invalid': errors.Price}" name="Price" v-model="tempProduct.price" rules="required"></v-field>
                                    <error-message class="invalid-feedback" name="Price"></error-message>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 d-flex align-items-center">
                        <label for="content" class="form-label">Content：</label>
                        <div class="w-100 d-flex flex-column">
                            <v-field type="text" id="content" class="form-control" :class="{'is-invalid': errors.Content}" name="Content" v-model="tempProduct.content" rules="required"></v-field>
                            <error-message class="invalid-feedback" name="Content"></error-message>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Description：</label>
                        <div class="w-100">
                            <v-field name="Description" rules="required" v-model="tempProduct.description">
                                <textarea name="Description" class="w-100" :class="{'is-invalid': errors.Description}" id="description" cols="30" rows="3" placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                                <error-message name="Description" class="invalid-feedback"></error-message>
                            </v-field>
                        </div>
                    </div>
                    <div class="mb-3 d-flex align-items-center">
                        <input type="checkbox" id="is_enabled" class="form-check-input me-2" :checked="tempProduct.is_enabled" v-model="tempProduct.is_enabled">
                        <label for="is_enabled" class="form-check-label">啟用</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Save changes</button>
        </div>
        </v-form>
    </div>
    </div>
</template>

<script>
const apiUrl=import.meta.env.VITE_API;
const apiPath=import.meta.env.VITE_PATH;

import MixinModal from '../assets/js/mixins/mixinModal.js';
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zh_TW from '@vee-validate/i18n/dist/locale/zh_TW.json';

defineRule('required', required);

configure({
    validateOnInput: true,
    generateMessage: localize({
        zh_TW,
    }),
});
setLocale('zh_TW');

export default {
    data(){
        return {
            tempProduct: {},
            imageUrl: '',
            disabled: false,
            fileData: '',
        }
    },
    mixins: [MixinModal],
    props: {
        editModal: {
            typeof: Object,
            default() {return {}; }
        }
    },
    components: {
        VForm: Form,
        VField: Field,
        ErrorMessage,
    },
    watch: {
        imageUrl(){
            this.imageUrl? this.disabled= true : this.disabled= false;
        },
        editModal(){
            this.tempProduct = {...this.editModal};
            console.log(this.tempProduct);
        },
    },
    methods: {
        throttle(callback){
            let setTime,callbackArg;
            return (...arg) => {
                callbackArg = arg;
                if(setTime){
                    return;
                }
                callback(callbackArg);
                callbackArg = null;
                setTime = setTimeout(() => {
                    setTime = null;
                    if(callbackArg){
                        callback(callbackArg);
                        callbackArg = null;
                    }
                }, 1000);
            }
        },
        onSubmit(value){
            console.log(value);
        },
        async loadFile(e){
            try{
                console.log(e.target.files[0]);
                const file = e.target.files[0];
                const formData = new FormData();
                formData.append('file-to-upload',file);

                const result = (await this.axios.post(`${apiUrl}/v2/api/${apiPath}/admin/upload`,formData));
                this.imageUrl = result.data.imageUrl;
            }catch(err){
                console.log(err.response);
            }
        },
        deleteImageUrl(){
            this.imageUrl = '';
            this.fileData = '';
        },
        deleteTempImage(e){
            console.log(e.target.previousElementSibling);
            console.log(e.target.previousElementSibling.alt);
            console.log(e.target.previousElementSibling.alt.includes('imageUrl'));
        },
    },
    mounted(){
        
    }
}
</script>
<style lang="scss">
textarea{
    resize: none;
}
.badge{
    cursor: pointer;
    &:active{
        background-color: #a80c0c !important;
    }
}
</style>