<template>
    <Loading :active="isLoading"></Loading>
    <div class="row | innerPage">
        <Toast></Toast>
        <div class="col-md-3 | classFilter">
            <!-- 手機的條件篩選 -->
            <button class="mobileFilter" @click.prevent="toggleFilter()">
                <span class="filterTitle">
                    <i class="bi bi-funnel-fill"></i>條件篩選
                </span>
                <i class="bi bi-caret-down-fill" ref="caret"></i>
            </button>
            <!-- PC的篩選 -->
            <h3 class="titleH3"><i class="bi bi-funnel-fill"></i>條件篩選</h3>
            <div class="filterMenuBox" ref="filterMenuBox">
                <ul ref="filterMenu">
                    <li>獲得方式</li>
                    <li><button @click="showAllProducts()">顯示全部</button></li>
                    <li v-for="(getMode, index) in getMethods" :key="index">
                        <!-- 選取的按鈕是selectedMethod -->
                        <button @click="clickGetMethods(getMode)">{{ getMode }}</button>
                    </li>
                </ul>
            </div>
        </div>

        <div class="col-md-9 | rightPage">
            <div class="pageTitle">
                <h3 class="titleH3">{{ pageName }}販售</h3>
                <!-- 搜尋bar -->
                <div class="searchBar">
                    <i class="bi bi-search"></i>
                    <input type="search" v-model="searchTerm" placeholder="輸入物品名稱" aria-describedby="button-add">
                </div>
            </div>
            <div class="row row-cols-2 row-cols-lg-5 g-4 | productsCard">
                <!-- 產品顯示 -->
                <div class="col | cardContent" v-for="item in paginatedProducts" :key="item.id">
                    <!-- 收藏的愛心 -->
                    <button class="heartPosition" @click="toggleFillHeart(item)">
                        <i class="bi | Favorite" :class="{ checked: this.isFavorite(item) }"></i>
                    </button>
                    <a class="card h-100">
                        <div class="productCardImg"
                            :style="{ backgroundImage: `url(${item.imageUrl || item.imagesUrl[0]})`, backgroundColor: pageName === '坐騎' ? 'black' : '' }"
                            @click="getProduct(item.id)">
                        </div>
                        <div class="card-body" @click="getProduct(item.id)">
                            <h5 class="card-title">{{ item.title }}</h5>
                            <p class="card-subtitle">{{ item.description }}</p>
                            <!-- <div class="card-text">{{ item.content }}</div> -->
                        </div>
                        <div class="card-footer">
                            <button type="button" class="btn" @click="addCart(item.id)"
                                :disabled="cartLoadingItem === item.id">
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
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import statusStore from '@/stores/statusStore';
import productStore from '@/stores/productStore';
import cartStore from '@/stores/cartStore';
import favoriteStore from '@/stores/favorite';

import Pages from '../components/PagesListForUser.vue';
import Toast from '../components/ToastMessages.vue';

import { gsap } from 'gsap';

export default {
    data() {
        return {
            product: {},
            searchTerm: '',
            getMethods: [
                '貨幣兌換', '副本掉落', '採集製作',
                '任務獎勵', '成就獎勵', '危命任務',
            ],
            selectedMethod: '',
            pageSize: 10,
            currentPage: 1,
            mobileFilterButton: window.innerWidth >= 768,
        }
    },
    props: {
        pageName: {
            type: String,
            required: true
        }
    },
    components: {
        Pages,
        Toast,
    },
    computed: {
        ...mapState(cartStore, ['sortProduct']),
        ...mapState(productStore, ['AllProducts']),
        ...mapState(statusStore, ['isLoading', 'cartLoadingItem']),
        ...mapState(favoriteStore, ['favoriteItem']),
        // 搜尋功能
        filteredProducts() {
            const str = this.searchTerm;
            const arr = [];
            // 沒有搜索詞
            if (str.trim() === '') {
                // 有選擇獲取來源時
                if (this.selectedMethod !== '') {
                    this.AllProducts.forEach((item) => {
                        if (item.description.includes(this.selectedMethod) && item.category === this.pageName) {
                            arr.push(item);
                        }
                    })
                } else {
                    // 顯示全部
                    this.AllProducts.forEach((item) => {
                        if (item.category === this.pageName) {
                            arr.push(item)
                        }
                    })
                }
            } else {
                // 有搜索詞
                this.AllProducts.forEach((item) => {
                    if (item.title.includes(str) || item.description.includes(str) || item.content.includes(str) && item.category === '寵物') {
                        arr.push(item);
                    }
                })
            }

            return [...new Set(arr)];
        },

        totalPages() {
            // 用篩選後的總筆數計算總共需要幾頁
            return Math.ceil(this.filteredProducts.length / this.pageSize);
        },

        paginatedProducts() {
            // 將此頁的資料放在這個陣列
            return this.filteredProducts.slice(
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
        ...mapActions(productStore, ['getAllProducts']),
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
        // 將關鍵字帶入並回到第一頁
        clickGetMethods(getMode) {
            this.selectedMethod = getMode;
            this.currentPage = 1;
            if (window.innerWidth < 768) {
                this.toggleFilter();
            }
        },
        toggleFilter() {
            this.mobileFilterButton = !this.mobileFilterButton;
            // 旋轉按鈕中的bi-caret-down-fill圖標
            const caret = this.$refs.caret;
            gsap.to(caret, {
                rotation: this.mobileFilterButton ? 180 : 0,
                duration: 1,
                ease: "power1".easeInOut,
            })

            // 展開選單動畫(同時播放)
            const tl = gsap.timeline();
            const menuTween = tl.to(this.$refs.filterMenuBox, {
                height: this.mobileFilterButton ? '424px' : '0px',
                ease: "power1".easeInOut,
                duration: 0.7,
            }).to(this.$refs.filterMenu, {
                opacity: this.mobileFilterButton ? 100 : 0,
                ease: "power1".easeInOut,
                duration: 0.7,
            }, 0);
            // 反轉動畫
            if (!this.mobileFilterButton && tl.isActive()) {
                menuTween.totalProgress(1);
                menuTween.reverse();
            }
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
        this.getAllProducts();
        this.getLocalStorage();
    },
}
</script>