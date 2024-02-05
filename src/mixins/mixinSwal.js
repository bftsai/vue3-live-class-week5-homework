export default {
  methods: {
    showSuccess(result) {
      const sweetConfig = {
        icon: 'success',
        title: result,
        timer: 800,
      };
      this.$swal(sweetConfig);
    },
    showError(result) {
      const sweetConfig = {
        icon: 'error',
        title: result,
      };
      this.$swal(sweetConfig);
    },
  },
};
