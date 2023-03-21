<template>
    <div class="row | innerPage">
        <div class="col-md-8">
            <div class="cartTitle">
                <router-link to>
                    <button @click="this.$router.back(1)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M17.77 3.77L16 2L6 12L16 22L17.77 20.23L9.54 12L17.77 3.77Z" fill="#828282" />
                        </svg>
                        <span>訂單列表</span>
                    </button>
                </router-link>
                訂單詳情
            </div>
            <!-- 購物車商品 -->
            <div class="cartCard | orderCard">
                <div class="card" v-for="item in order.products" :key="item.product_id">
                    <div class="card-body | cartCardContent">
                        <div class="cardFirstBox">
                            <div class="cartImg"
                                :style="{ backgroundImage: `url(${item.product.imagesUrl ? item.product.imagesUrl[0] : item.product.imageUrl})` }">
                            </div>
                            <p class="card-text mb-0">{{ item.product.title }}</p>
                        </div>
                        <div class="d-flex | cartProductQty">
                            {{ item.qty }}{{ item.product.unit }}
                            <span style="line-height: 1.1em;">
                                <small v-if="item.final_total !== item.total" class="text-success"
                                    style="display: block;">折扣價</small>
                                NT$ {{ $filters.currency(item.final_total) }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 訂單購買人資料 -->
            <table class="orderUser">
                <thead>購買人資訊</thead>
                <tbody>
                    <tr class="userTitle">
                        <th>收件人</th>
                        <td>{{ order.user.name }}</td>
                    </tr>
                    <tr class="userTitle">
                        <th>電話</th>
                        <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr class="userTitle">
                        <th>e-mail</th>
                        <td>{{ order.user.email }}</td>
                    </tr>
                    <tr class="userTitle">
                        <th>地址</th>
                        <td>{{ order.user.address }}</td>
                    </tr>
                    <tr v-if="order.message">
                        <th>留言</th>
                        <td>{{ order.message }}</td>
                    </tr>
                </tbody>
            </table>
            <!-- 訂單價格 -->
            <div class="cartTotal">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
                    </div>
                    <div>
                        <span>總計 NT$ </span>
                        <span class="priceBox" :class="{ 'bigPrice': cart.final_total == cart.total }">{{
                            $filters.currency(cart.total) }}</span>
                    </div>
                </div>
                <!-- 有優惠券才會出現 -->
                <div style="color: red;" v-if="cart.final_total !== cart.total">
                    <div class="d-flex justify-content-between align-items-center my-2">
                        <div class="input-group">
                            <span>已套用優惠券！</span>
                        </div>
                        <div>
                            <span>優惠券折扣 NT$ </span>
                            <span class="priceBox">{{ $filters.currency(cart.final_total - cart.total) }}</span>
                        </div>
                    </div>
                    <p class="text-end m-0">折扣後價格
                        <span>NT$ </span>
                        <span class="bigPrice">{{ $filters.currency(cart.final_total) }}</span>
                    </p>
                </div>
            </div>
        </div>
        <form class="col-md-4" @submit.prevent="payOrder">
            <table class="table align-middle">
                <thead>
                    <th>品名</th>
                    <th>數量</th>
                    <th>單價</th>
                </thead>
                <tbody>
                    <tr v-for="item in order.products" :key="item.product_id">
                        <td>{{ item.product.title }}</td>
                        <td>{{ item.qty }} / {{ item.product.unit }}</td>
                        <td class="text-end">{{ item.final_total }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2" class="text-end">總計</td>
                        <td class="text-end">{{ order.total }}</td>
                    </tr>
                </tfoot>
            </table>

            <table class="table">
                <tbody>
                    <tr>
                        <th width="100">Email</th>
                        <td>{{ order.user.email }}</td>
                    </tr>
                    <tr>
                        <th>姓名</th>
                        <td>{{ order.user.name }}</td>
                    </tr>
                    <tr>
                        <th>收件人電話</th>
                        <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr>
                        <th>收件人地址</th>
                        <td>{{ order.user.address }}</td>
                    </tr>
                    <tr>
                        <th>付款狀態</th>
                        <td>
                            <span v-if="!order.is_paid">尚未付款</span>
                            <span class="text-success" v-else>付款完成</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="text-end" v-if="!order.is_paid">
                <button class="btn btn-danger">確認付款去</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            order: {
                products: {},
                user: {},
            },
            orderId: '',
            isLoading: false,
        }
    },
    methods: {
        getOrders() {
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
            this.$http.get(url)
                .then((res) => {
                    if (res.data.success) {
                        this.order = res.data.order;
                    }
                })
        },
        payOrder() {
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`;
            this.$http.post(url)
                .then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        this.getOrders();
                    }
                })
        }
    },
    created() {
        //網址上取得ID
        this.orderId = this.$route.params.orderId;
        console.log(this.orderId);
        this.getOrders();
    },
}
</script>