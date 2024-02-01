<template>
    <nav>
        <ul class="pagination justify-content-center my-3">
            <li class="page-item" :class="{'disabled':!paginationObj.has_pre}">
                <a class="page-link" :class="{'text-dark':!paginationObj.has_pre}"
                @click="changePage">Previous</a>
            </li>
            <li class="page-item" :class="{'active':paginationObj.current_page===key+1}"
            v-for="(item,key) in paginationObj.total_pages" :key="'key' + key">
                <a class="page-link" :class="{'text-dark':paginationObj.current_page===key+1}"
                @click="changePage">{{ key+1 }}</a>
            </li>
            <li class="page-item" :class="{'disabled':!paginationObj.has_next}">
                <a class="page-link" :class="{'text-dark':!paginationObj.has_next}"
                @click="changePage">Next</a>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
  props: ['paginationObj'],
  methods: {
    changePage(e) {
      if (e.target.textContent === 'Next') {
        this.$emit('emit-selectPage', this.paginationObj.current_page + 1);
      } else if (e.target.textContent === 'Previous') {
        this.$emit('emit-selectPage', this.paginationObj.current_page - 1);
      } else if (!e.target.closest('li').className.includes('active')) {
        this.$emit('emit-selectPage', e.target.textContent);
      }
      window.scrollTo(0, 0);
    },
  },
};
</script>
<style lang="scss">
.page-item:not(.disabled,.active){
    &:hover{
        cursor: pointer;
    }
}
</style>
