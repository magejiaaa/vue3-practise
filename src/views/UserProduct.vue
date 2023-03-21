<template>
    <Loading :active="isLoading"></Loading>
    <div class="container | innerPage">
        <Toast></Toast>
        <nav aria-label="breadcrumb" class="breadBox">
            <router-link to>
                <button @click="goToAllProduct()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M17.77 3.77L16 2L6 12L16 22L17.77 20.23L9.54 12L17.77 3.77Z" fill="#828282" />
                    </svg>
                    <span>返回列表</span>
                </button>
            </router-link>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/user/cart">購物車</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
            </ol>
        </nav>

        <article class="row justify-content-center">
            <div class="col-md-4 | lightBox">
                <swiper-container navigation="true" pagination="true" init="false">
                    <swiper-slide v-for="(image, key) in product.imagesUrl" :key="key">
                        <img :src="image" alt="" class="img-fluid mb-3">
                    </swiper-slide>
                </swiper-container>
                <img :src="product.imageUrl" alt="" class="img-fluid mb-3">
            </div>
            <!-- 商品內容 -->
            <div class="col-md-8 d-flex flex-column justify-content-between">
                <div>
                    <div class="proTitle">
                        <div>
                            <h2>{{ product.title }}</h2>
                            <div class="proDescription">{{ product.description }}</div>
                        </div>
                        <button @click="toggleFillHeart(product)">
                            <i class="bi | Favorite" :class="{ checked: this.isFavorite(product) }"></i>
                        </button>
                    </div>
                    <div class="proContent">{{ product.content }}</div>
                </div>
                <div>
                    <div class="proPrice">
                        <div v-if="!product.price">NT$ <span>{{ product.origin_price }} </span></div>
                        <del v-if="product.price">NT$ {{ product.origin_price }} </del>
                        <div v-if="product.price">NT$ <span>{{ product.price }} </span></div>
                    </div>
                    <div class="proQuantity">
                        <span class="input-number-decrement" @click="this.quantity > 1 ? this.quantity-- : null">–</span>
                        <input class="input-number" type="number" v-model="quantity" min="1">
                        <span class="input-number-increment" @click="this.quantity++">+</span>
                        <button type="button" class="normalBtn" @click="addCart(product.id, quantity)">
                            <div class="spinner-grow spinner-grow-sm text-light" role="status"
                                v-if="cartLoadingItem === this.product.id">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            加到購物車
                        </button>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import favoriteStore from '@/stores/favorite';
import cartStore from '@/stores/cartStore';
import statusStore from '@/stores/statusStore';

import Toast from '../components/ToastMessages.vue';

export default {
    data() {
        return {
            product: {},
            id: '',
            swiperOptions: {},
            quantity: 1,
            pageName: '',
        }
    },
    components: {
        Toast,
    },
    computed: {
        ...mapState(favoriteStore, ['favoriteItem']),
        ...mapState(statusStore, ['cartLoadingItem']),
    },
    methods: {
        ...mapActions(favoriteStore, ['addToFavorites', 'removeFromFavorites', 'isFavorite', 'getLocalStorage']),
        ...mapActions(cartStore, ['addCart']),
        getProduct(id) {
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
            this.isLoading = true;
            // 第一個是路徑 第二個是送出的資料
            this.$http.get(url)
                .then((res) => {
                    if (res.data.success) {
                        this.isLoading = false;
                        console.log(res);
                        this.product = res.data.product;
                    }
                });
        },
        changeSwiperStyle() {
            const swiperEl = document.querySelector('swiper-container');

            const params = {
                // array with CSS styles
                injectStyles: [
                    `
                    .swiper-horizontal {
                        padding-bottom: 20px;
                    }
                    .swiper-button-next, .swiper-button-prev {
                        opacity: 0;
                        transition: all 0.3s ease;
                        padding: 0 15px;
                    }
                    .swiper-button-next:hover, .swiper-button-prev:hover {
                        opacity: 100%;
                    }
                    .swiper-button-next.swiper-button-disabled,
                    .swiper-button-prev.swiper-button-disabled {
                        opacity: 0;
                        cursor: pointer;
                    }
                    .swiper-button-next.swiper-button-disabled:hover,
                    .swiper-button-prev.swiper-button-disabled:hover {
                        opacity: .35;
                    }
                    `,
                ],
            };
            Object.assign(swiperEl, params);
            swiperEl.initialize();
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
        // 返回列表
        goToAllProduct() {
            this.pageName = this.product.category;
            this.$router.push(`/user/AllProduct/${this.pageName}`)
        }
    },
    watch: {
        $route(to, from) {
            // 判斷 $route.params.productId 是否有變化
            if (to.params.productId !== from.params.productId) {
                this.getProduct(this.$route.params.productId);
                this.getLocalStorage();
            }
        }
    },
    created() {
        // 從router取得ID
        this.id = this.$route.params.productId;
        this.getProduct(this.id);
        this.getLocalStorage();
    },
    mounted() {
        this.changeSwiperStyle();
    }
}
</script>