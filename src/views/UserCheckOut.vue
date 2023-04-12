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
            <div class="cartTotal checkOutTotal">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="input-group">
                        <input type="text" disabled class="form-control | isCouponSale" v-model="coupon_code"
                            v-if="coupon_code !== ''">
                    </div>
                    <div>
                        <span>總計 NT$ </span>
                        <span class="priceBox">{{ $filters.currency(getOriginPrice) }}</span>
                    </div>
                </div>
                <!-- 有優惠券才會出現 -->
                <div style="color: red;" v-if="getOriginPrice !== order.total">
                    <div class="text-end">
                        <span>優惠券折扣 NT$ </span>
                        <span class="priceBox">{{ $filters.currency(order.total - getOriginPrice) }}</span>
                    </div>
                    <p class="text-end m-0 text-dark">折扣後價格
                        <span style="color: #9747ff;">NT$ </span>
                        <span class="bigPrice" style="color: #9747ff;">
                            {{ $filters.currency(order.total) }}</span>
                    </p>
                </div>
            </div>
        </div>
        <!-- 付款資訊 -->
        <div class="col-md-4 justify-content-center">
            <Form v-slot="{ errors }" @submit="payOrder" class="orderForm payForm" v-if="order">
                <div v-if="order.is_paid" class="alreadyPaid">
                    <img src="../assets/image/mdi_credit-card-check-outline.png" alt="">
                    <p>已付款完成</p>
                </div>
                <div class="scrollBarStyle" v-else>
                    <p>付款資訊</p>
                    <div class="mb-3 | dropdownSelect">
                        <label for="payMethods" class="form-label">付款方式</label>
                        <i class="bi bi-caret-down-fill"></i>
                        <select id="payMethods" name="payMethods" class="form-control"
                            :class="{ 'is-invalid': errors['付款方式'] }" placeholder="請選擇付款方式" rules="required"
                            v-model="payContent.method">
                            <option value="" disabled>請選擇付款方式</option>
                            <option value="信用卡">信用卡</option>
                            <option value="匯款">匯款</option>
                        </select>
                        <ErrorMessage name="payMethods" class="invalid-feedback"></ErrorMessage>
                    </div>
                    <!-- 信用卡輸入欄位 -->
                    <div v-if="payContent.method !== '匯款'">
                        <div class="mb-3">
                            <label for="cardNumber" class="form-label">信用卡卡號</label>
                            <input class="form-control" id="cardNumber" name="cardNumber"
                                :class="{ 'is-invalid': errors['信用卡卡號'] }" placeholder="請輸入信用卡卡號" rules="required"
                                v-model="payContent.cardNumber">
                        </div>
                        <div class="mb-3 d-flex">
                            <div class="w-50">
                                <label for="cardDate" class="form-label">到期日(月/年)</label>
                                <div class="d-flex | cardDate">
                                    <input class="form-control" id="cardDate" name="cardDate"
                                        :class="{ 'is-invalid': errors['到期月份'] }" placeholder="月份" rules="required"
                                        v-model="payContent.cardDateMonth">
                                    <input class="form-control me-3" id="cardDate" name="cardDate"
                                        :class="{ 'is-invalid': errors['到期年份'] }" placeholder="年份" rules="required"
                                        v-model="payContent.cardDateYear">
                                </div>
                            </div>
                            <div class="w-50">
                                <label for="cardPassword" class="form-label">安全碼</label>
                                <input class="form-control" id="cardPassword" name="cardPassword"
                                    :class="{ 'is-invalid': errors['安全碼'] }" placeholder="請輸入安全碼" rules="required"
                                    v-model="payContent.cardPassword">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="cardAddress" class="form-label">帳單地址</label>
                            <input class="form-control" id="cardAddress" name="cardAddress"
                                :class="{ 'is-invalid': errors['帳單地址'] }" placeholder="請輸入帳單地址" rules="required"
                                v-model="payContent.cardAddress">
                        </div>
                    </div>
                    <!-- 匯款資料 -->
                    <table style="width: 100%;" class="mb-3" v-else>
                        <thead>匯款資訊</thead>
                        <tbody class="bankNumber">
                            <tr>
                                <th>銀行名稱</th>
                                <td>822 中國信託銀行</td>
                            </tr>
                            <tr>
                                <th>戶名</th>
                                <td>亞馬烏羅提股份有限公司</td>
                            </tr>
                            <tr>
                                <th>帳號</th>
                                <td>1133 4342 4329</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="text-center mt-auto" v-if="!order.is_paid">
                        <button class="normalBtn blueBtn">確認付款</button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
    <IsPaidModal ref="paidModal"></IsPaidModal>
</template>

<script>
import { mapState, mapActions, mapWritableState } from 'pinia';
import couponStore from '@/stores/couponStore';
import statusStore from '@/stores/statusStore';
import IsPaidModal from '../components/IspaidModal.vue';

export default {
    data() {
        return {
            payContent: {
                cardNumber: '',
                method: '',
                cardDateMonth: null,
                cardDateYear: null,
                cardPassword: null,
                cardAddress: '',
            },
            salePrice: 0,
            bankNumberShow: false,
        }
    },
    components: {
        IsPaidModal,
    },
    computed: {
        ...mapState(statusStore, ['isLoading', 'cartLoadingItem']),
        ...mapState(couponStore, ['coupon_code', 'order']),
        ...mapWritableState(couponStore, {
            myOrderID: 'orderId',
        }),
        getOriginPrice() {
            // 取得訂單折扣前價格
            // 取得所有this.order.products的值轉成陣列
            const productsArr = Object.values(this.order.products);
            // 將每個產品的total取出來
            const orderPriceArr = productsArr.map(el => el.total);
            // 累加並從0開始
            return orderPriceArr.reduce((a, b) => a + b, 0);
        }
    },
    methods: {
        ...mapActions(couponStore, ['getCouponCode', 'getOrders']),
        payOrder() {
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.myOrderID}`;
            this.$http.post(url)
                .then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        this.getOrders();
                        const paidComponent = this.$refs.paidModal;
                        paidComponent.showModal();
                    }
                })
        },
    },
    mounted() {
        //網址上取得ID
        this.myOrderID = this.$route.params.orderId;
        this.getOrders();
    },
}
</script>