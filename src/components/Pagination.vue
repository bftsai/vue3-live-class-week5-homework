<template>
    <nav>
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{'disabled':!paginationObj.has_pre}">
                <a class="page-link" :class="{'text-dark':!paginationObj.has_pre}">Previous</a>
            </li>
            <li class="page-item" :class="{'active':paginationObj.current_page}" v-for="(item,key) in paginationObj.total_pages" :key="'key' + key">
                <a class="page-link" :class="{'text-dark':paginationObj.current_page}">{{ key+1 }}</a>
            </li>
            <li class="page-item" :class="{'disabled':!paginationObj.has_next}">
                <a class="page-link" :class="{'text-dark':!paginationObj.has_next}" href="#">Next</a>
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
            // console.log(this.paginationObj);
        }
    },
    methods: {
        
    },
    created(){
        
    },
    mounted(){
        
    }
}
</script>