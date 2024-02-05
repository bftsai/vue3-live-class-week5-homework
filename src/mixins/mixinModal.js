import Modal from 'bootstrap/js/dist/modal';

export default {
  methods: {
    showModal() {
      const myModal = new Modal(this.$refs.modal, {
        keyboard: false,
      });
      this.modal = myModal;
      this.modal.show();
    },
    hideModal() {
      this.tempProduct = {};
      this.imageUrl = '';
      this.disabled = false;
      this.fileData = '';
      this.$emit('emit-hideModal');
      this.modal.hide();
    },
  },
};
