import Modal from 'bootstrap/js/dist/modal.js';
export default {
    methods: {
        showModal(){
            const myModal = new Modal(this.$refs.modal,{
                keyboard: false,
            });
            this.modal = myModal;
            this.modal.show();
        },
        hideModal(){
            this.tempProduct = {};
            this.$emit('emit-hideModal');
            this.modal.hide();
        }
    },
}