<template>
    <Loading :active="isLoading"></Loading>
    <div class="row | innerPage">
        <div class="col-md-3 | classFilter">
            <h3 class="titleH3"><i class="bi bi-funnel-fill"></i>條件篩選</h3>
            <ul>
                <li>獲得方式</li>
                <li><button @click="selectedMethod = ''">顯示全部</button></li>
                <li v-for="(getMode, index) in getMethods" :key="index">
                    <!-- 選取的按鈕是selectedMethod -->
                    <button @click="selectedMethod = getMode">{{ getMode }}</button>
                </li>
            </ul>
        </div>
        <div class="col-md-9 | rightPage">
            <div class="pageTitle">
                <h3 class="titleH3">寵物販售</h3>
                <!-- 搜尋bar -->
                <div class="searchBar">
                    <input type="search" v-model="searchTerm" placeholder="輸入物品名稱" aria-describedby="button-add">
                </div>
            </div>
            <div class="row row-cols-2 row-cols-md-5 g-4 | productsCard">
                <div class="col" v-for="item in filterSearch" :key="item.id">
                    <div class="card h-100">
                        <div style="height: 150px;
                                    background-size: cover;
                                    background-position: center" :style="{ backgroundImage: `url(${item.imageUrl})` }">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{{ item.title }}</h5>
                            <p class="card-subtitle">{{ item.description }}</p>
                            <div class="card-text">{{ item.content }}</div>
                        </div>
                        <div class="card-footer">
                            <button type="button" class="btn" @click="addCart(item.id)"
                                :disabled="cartLoadingItem === item.id">
                                <div class="spinner-grow spinner-grow-sm text-danger" role="status"
                                    v-if="cartLoadingItem === item.id">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                加到購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Pages :pages="pagination" @emit-pages="getProducts" v-if="selectedMethod == ''"></Pages>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import statusStore from '@/stores/statusStore';
import productStore from '@/stores/productStore';
import cartStore from '@/stores/cartStore'

import Pages from '../components/PagesList.vue';

export default {
    data() {
        return {
            product: {},
            searchTerm: '',
            getMethods: [
                '貨幣兌換', '副本掉落', '採集製作',
                '任務獎勵', '成就獎勵', '危命任務'
            ],
            selectedMethod: '',
        }
    },
    components: {
        Pages,
    },
    computed: {
        ...mapState(cartStore, ['sortProduct']),
        ...mapState(productStore, ['sortProduct', 'pagination', 'AllProducts']),
        ...mapState(statusStore, ['isLoading', 'cartLoadingItem']),
        // 搜尋功能
        filterSearch() {
            const str = this.searchTerm;
            const arr = [];
            if (str.trim() === '') {
                if (this.selectedMethod !== '') {
                    this.AllProducts.forEach((item) => {
                        if (item.description.includes(this.selectedMethod)) {
                            arr.push(item)
                        }
                    })
                } else {
                    return this.sortProduct;
                }
            } else {
                this.AllProducts.forEach((item) => {
                    if (item.title.includes(str) || item.description.includes(str) || item.content.includes(str)) {
                        arr.push(item)
                    }
                })
            }


            return [...new Set(arr)]
        },
    },
    methods: {
        ...mapActions(cartStore, [
            'getCart',
            'addCart',
            'removeCartItem',
            'updateCart'
        ]),
        ...mapActions(productStore, ['getProducts', 'getAllProducts']),
        getProduct(id) {
            this.$router.push(`/user/product/${id}`);
        },
    },
    created() {
        this.getProducts();
        this.getAllProducts();
    },
}
</script>