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
                                    <button type="button" class="btn btn-outline-danger">
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
            products:[],
            product: {},
            status: {
                loadingItem:'',
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
        }
    },
    created() {
        this.getProducts();
    },
}
</script>