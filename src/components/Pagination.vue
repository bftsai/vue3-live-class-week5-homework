<template>
    <nav>
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{'disabled':!paginationObj.has_pre}">
                <a class="page-link" :class="{'text-dark':!paginationObj.has_pre}">Previous</a>
            </li>
            <li class="page-item" :class="{'active':paginationObj.current_page===key+1}" v-for="(item,key) in paginationObj.total_pages" :key="'key' + key">
                <a class="page-link" :class="{'text-dark':paginationObj.current_page===key+1}" @click="changePage">{{ key+1 }}</a>
            </li>
            <li class="page-item" :class="{'disabled':!paginationObj.has_next}">
                <a class="page-link" :class="{'text-dark':!paginationObj.has_next}">Next</a>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props: ['paginationObj'],
    watch: {
        paginationObj(){
            
        }
    },
    methods: {
        changePage(e){
            if(e.target.closest('li').className.includes('active')){
                return;
            }
            this.$emit('emit-selectPage',e.target.textContent);
        },
    },
    created(){
        
    },
    mounted(){
        
    }
}
</script>
<style lang="scss">
.page-item:not(.disabled,.active){
    &:hover{
        cursor: pointer;
    }
}
</style>