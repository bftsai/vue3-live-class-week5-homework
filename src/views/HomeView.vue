<template>
  <h1>Home</h1>
</template>
<script>
export default {
  data(){
    return {

    }
  },
  created(){
    this.$emit('emit-login');
  },
}
</script>