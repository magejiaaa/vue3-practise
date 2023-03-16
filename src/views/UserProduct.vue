<template>
    <Loading :active="isLoading"></Loading>
    <div class="container | innerPage">
        <nav aria-label="breadcrumb" class="breadBox">
            <router-link to>
                <button @click="$router.back(-1)">
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
            <div class="col-md-8">
                <h2>{{ product.title }}</h2>
                <button  @click="toggleFillHeart(product)">
                        <i class="bi | Favorite" :class="{ checked: this.isFavorite(product) }"></i>
                    </button>
                <div>{{ product.content }}</div>
                <div>{{ product.description }}</div>
                <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
                <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
                <hr>
                <button type="button" class="btn btn-outline-danger" @click="addToCart(product.id)">
                    加到購物車
                </button>
            </div>
        </article>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import favoriteStore from '@/stores/favorite';
export default {
    data() {
        return {
            product: {},
            id: '',
            swiperOptions: {},
        }
    },
    computed: {
        ...mapState(favoriteStore, ['favoriteItem']),
    },
    methods: {
        ...mapActions(favoriteStore, ['addToFavorites', 'removeFromFavorites', 'isFavorite', 'getLocalStorage']),
        getProduct() {
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
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
    },
    created() {
        // 從router取得ID
        this.id = this.$route.params.productId;
        this.getProduct();
        this.getLocalStorage();
    },
    mounted() {
        this.changeSwiperStyle();
    }
}
</script>