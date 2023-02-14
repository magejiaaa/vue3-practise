<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <li class="page-item"
            v-if=" pages.current_page > 1 "
            @click.prevent="prePage">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" v-for=" page in pages.total_pages " :key="page"
                :class="{ 'active': page === pages.current_page }">
                <a class="page-link" href="#" @click.prevent="updatePage(page)"> {{ page }} </a>
            </li>
            <li class="page-item" 
            v-if="pages.current_page < pages.total_pages" 
            @click.prevent="nextPage">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"
export default {
    props: ['pages'],
    methods: {
        updatePage(page) {
            this.$emit('emit-pages', page);
        },
        nextPage() {
            this.updatePage(Math.min(this.pages.current_page + 1, this.pages.total_pages));
        },
        prePage() {
            this.updatePage(Math.max(this.pages.current_page - 1, 1));
        },
    },
};
</script>