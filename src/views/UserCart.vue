<template>
    <Loading :active="isLoading"></Loading>
    <div class="container">
        <div class="row mt-4">
            <div class="col-md-7">
                <table class="table align-middle">
                    <thead>
                        <tr>
                            <th>圖片</th>
                            <th>商品名稱</th>
                            <th>價格</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in products" :key="item.id">
                            <td style="width: 200px">
                                <div style="height: 100px; background-size: cover; background-position: center"
                                    :style="{ backgroundImage: `url(${item.imageUrl})` }"></div>
                            </td>
                            <td><a href="#" class="text-dark">{{ item.title }}</a></td>
                            <td>
                                <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                                <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                                <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
                            </td>
                            <td>
                                <div class="btn-group btn-group-sm">
                                    <button type="button" class="btn btn-outline-secondary" @click="getProduct(item.id)">
                                        查看更多
                                    </button>
                                    <button type="button" class="btn btn-outline-danger" @click="addCart(item.id)"
                                    :disabled="this.status.loadingItem === item.id">
                                        <div class="spinner-grow spinner-grow-sm text-danger" role="status" v-if="this.status.loadingItem === item.id">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                        加到購物車
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 購物車列表 -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            products: [],
            product: {},
            status: {
                loadingItem: '', //需對應品項ID
            }
        }
    },
    methods: {
        getProducts() {
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
            this.isLoading = true;
            // 第一個是路徑 第二個是送出的資料
            this.$http.get(api)
                .then((res) => {
                    if (res.data.success) {
                        this.isLoading = false;
                        this.products = res.data.products;
                    }
                });
        },
        getProduct(id) {
            this.$router.push(`/user/product/${id}`);
        },
        addCart(id) {
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
            this.status.loadingItem = id;
            // 要按照api的格式post
            const cart = {
                product_id: id,
                qty: 1,
            }
            this.$http.post(url, { data: cart })
                .then((res) => {
                    this.status.loadingItem = '';
                    console.log(res);
                })
        }
    },
    created() {
        this.getProducts();
    },
}
</script>