<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <li class="page-item" v-if="currentPage > 1" @click.prevent="prePage">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" v-for=" page in pages " :key="page"
                :class="{ 'active': page === currentPage }">
                <a class="page-link" href="#" @click.prevent="updatePage(page)"> {{ page }} </a>
            </li>
            <li class="page-item" v-if="currentPage < totalPages" @click.prevent="nextPage">
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
    props: {
        pages: {
            type: Array,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        }
    },
    methods: {
        updatePage(page) {
            this.$emit('emit-pages', page);
        },
        nextPage() {
            this.updatePage(Math.min(this.currentPage + 1, this.totalPages));
        },
        prePage() {
            this.updatePage(Math.max(this.currentPage - 1, 1));
        },
    },
};
</script>