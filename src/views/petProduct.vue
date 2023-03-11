<template>
    <Loading :active="isLoading"></Loading>
    <div class="row | innerPage">
        <div class="col-md-3 | classFilter">
            <h3><i class="bi bi-funnel-fill"></i>條件篩選</h3>
            <ul>
                <li>獲得方式</li>
                <li><a href="">貨幣兌換</a></li>
                <li><a href="">副本掉落</a></li>
                <li><a href="">採集製作</a></li>
                <li><a href="">任務獎勵</a></li>
                <li><a href="">成就獎勵</a></li>
                <li><a href="">危命任務</a></li>
            </ul>
        </div>
        <div class="col-md-9">
            <div class="row row-cols-2 row-cols-md-5 g-4 | productsCard">
                <div class="col" v-for="item in sortProduct" :key="item.id">
                    <div class="card h-100">
                        <div style="height: 100px; background-size: cover; background-position: center"
                            :style="{ backgroundImage: `url(${item.imageUrl})` }"></div>
                        <div class="card-body">
                            <h5 class="card-title">{{ item.title }}</h5>
                            <p class="card-subtitle">{{ item.description }}</p>
                            <div class="card-text">{{ item.content }}</div>
                        </div>
                        <div class="card-footer">
                            <button type="button" class="btn btn-outline-danger" @click="addCart(item.id)"
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
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import statusStore from '@/stores/statusStore';
import productStore from '@/stores/productStore';
import cartStore from '@/stores/cartStore'

export default {
    data() {
        return {
            product: {},
        }
    },
    computed: {
        ...mapState(cartStore, ['sortProduct']),
        ...mapState(productStore, ['sortProduct']),
        ...mapState(statusStore, ['isLoading', 'cartLoadingItem']),
    },
    methods: {
        ...mapActions(cartStore, [
            'getCart',
            'addCart',
            'removeCartItem',
            'updateCart'
        ]),
        ...mapActions(productStore, ['getProducts']),
        getProduct(id) {
            this.$router.push(`/user/product/${id}`);
        },
    },
    created() {
        this.getProducts();
    },
}
</script>