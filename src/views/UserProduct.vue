<template>
    <Loading :active="isLoading"></Loading>
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/user/cart">購物車</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
            </ol>
        </nav>
        <div class="row justify-content-center">
            <article class="col-8">
                <h2>{{ product.title }}</h2>
                <div>{{ product.content }}</div>
                <div>{{ product.description }}</div>
                <img :src="product.imageUrl" alt="" class="img-fluid mb-3">
            </article>
            <div class="col-4">
                <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
                <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
                <hr>
                <button type="button" class="btn btn-outline-danger" @click="addToCart(product.id)">
                    加到購物車
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            product: {},
            id: '',
        }
    },
    methods: {
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
    },
    created() {
        // 從router取得ID
        this.id = this.$route.params.productId;
        this.getProduct();
    },
}
</script>