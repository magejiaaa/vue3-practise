<template>
    <Loading :active="isLoading"></Loading>
    <div class="col-md-9 | dashboardPage">
        <Toast></Toast>
        <div class="stageTitle">
            <h3 class="m-0">我的收藏</h3>
        </div>

        <div class="row row-cols-2 row-cols-lg-5 g-4 | productsCard">
            <!-- 產品顯示 -->
            <p class="text-center w-100" v-if="totalPages == 0">尚未新增收藏商品！</p>
            <div class="col | cardContent" v-for="item in paginatedProducts" :key="item.id">
                <!-- 收藏的愛心 -->
                <button class="heartPosition" @click="toggleFillHeart(item)">
                    <i class="bi | Favorite" :class="{ checked: this.isFavorite(item) }"></i>
                </button>
                <a class="card h-100">
                    <div class="productCardImg"
                        :style="{ backgroundImage: `url(${item.imageUrl || item.imagesUrl[0]})`, backgroundColor: item.category === '坐騎' ? 'black' : '' }"
                        @click="getProduct(item.id)">
                    </div>
                    <div class="card-body" @click="getProduct(item.id)">
                        <h5 class="card-title">{{ item.title }}</h5>
                        <p class="card-subtitle">{{ item.description }}</p>
                        <!-- <div class="card-text">{{ item.content }}</div> -->
                    </div>
                    <div class="card-footer">
                        <button type="button" class="btn" @click="addCart(item.id)" :disabled="cartLoadingItem === item.id">
                            <div class="spinner-grow spinner-grow-sm text-primary" role="status"
                                v-if="cartLoadingItem === item.id">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            加到購物車
                        </button>
                    </div>
                </a>
            </div>
        </div>
        <Pages :pages="pagination" :totalPages="totalPages" :currentPage="currentPage" @emit-pages="handlePageClick">
        </Pages>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import favoriteStore from '@/stores/favorite';
import cartStore from '@/stores/cartStore';
import statusStore from '@/stores/statusStore';

import Pages from '../components/PagesListForUser.vue';
import Toast from '../components/ToastMessages.vue';

export default {
    data() {
        return {
            pageSize: 10,
            currentPage: 1,
            mobileFilterButton: window.innerWidth >= 768,
        }
    },
    props: {
        loginState: {
            type: Boolean,
        }
    },
    components: {
        Pages,
        Toast,
    },
    computed: {
        ...mapState(cartStore, ['sortProduct']),
        ...mapState(statusStore, ['isLoading', 'cartLoadingItem']),
        ...mapState(favoriteStore, ['favoriteItem']),

        totalPages() {
            // 用篩選後的總筆數計算總共需要幾頁
            return Math.ceil(this.favoriteItem.length / this.pageSize);
        },

        paginatedProducts() {
            // 將此頁的資料放在這個陣列
            return this.favoriteItem.slice(
                (this.currentPage - 1) * this.pageSize,
                this.currentPage * this.pageSize
            );
        },

        pagination() {
            // 將總頁數轉換陣列 EX:3頁轉成1,2,3
            const pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
            return pages;
        }
    },
    methods: {
        ...mapActions(cartStore, [
            'getCart',
            'addCart',
            'removeCartItem',
            'updateCart'
        ]),
        ...mapActions(favoriteStore, ['addToFavorites', 'removeFromFavorites', 'isFavorite', 'getLocalStorage']),
        // 點選產品帶入產品ID
        getProduct(id) {
            this.$router.push(`/user/product/${id}`);
        },
        // 傳入選取的頁數
        handlePageClick(page) {
            this.currentPage = page;
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        },
        showAllProducts() {
            this.selectedMethod = '';
            if (window.innerWidth < 768) {
                this.toggleFilter();
            }
        },
        // 加入收藏
        toggleFillHeart(item) {
            if (this.isFavorite(item)) {
                // 從 pinia 中刪除 item
                this.removeFromFavorites(item);
                item.fillHeart = !item.fillHeart;
            } else {
                // 將 item 添加到 pinia 中
                this.addToFavorites(item);
                item.fillHeart = !item.fillHeart;
            }
        },
    },
    created() {
        this.getLocalStorage();
        this.pageType = 'favorite';
    },
}
</script>