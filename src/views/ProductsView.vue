<template>
    <h1>This is Products page</h1>
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