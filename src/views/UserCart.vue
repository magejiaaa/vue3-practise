<template>
    <Loading :active="isLoading"></Loading>
    <div class="row | innerPage">
        <Toast></Toast>
        <!-- 購物車列表 -->
        <div class="col-md-8">
            <div class="cartTitle">
                <router-link to>
                    <button @click="this.$router.back(1)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M17.77 3.77L16 2L6 12L16 22L17.77 20.23L9.54 12L17.77 3.77Z" fill="#828282" />
                        </svg>
                        <span>繼續購物</span>
                    </button>
                </router-link>
                購物車
            </div>
            <!-- 購物車商品 -->
            <div class="cartCard" v-if="cart.total > 0">
                <div class="card" v-for="item in cart.carts" :key="item.product_id">
                    <div class="card-body | cartCardContent">
                        <div class="cardFirstBox">
                            <div class="cartImg"
                                :style="{ backgroundImage: `url(${item.product.imagesUrl ? item.product.imagesUrl[0] : item.product.imageUrl})` }">
                            </div>
                            <p class="card-text mb-0">{{ item.product.title }}</p>
                        </div>
                        <!-- 商品數量 -->
                        <div class="d-flex | cartProductQty">
                            <span class="input-number-decrement" @click="decrementQty(item)"
                                :disabled="item.id === cartLoadingItem">–</span>
                            <input class="input-number" type="number" v-model.number="item.qty"
                                :disabled="item.id === cartLoadingItem" @change="updateCart(item)" min="1">
                            <span class="input-number-increment" @click="incrementQty(item)"
                                :disabled="item.id === cartLoadingItem">+</span>
                        </div>
                        <span style="line-height: 1.1em;">
                            <small v-if="cart.final_total !== cart.total" class="text-success"
                                style="display: block;">折扣價</small>
                            NT$ {{ $filters.currency(item.final_total) }}
                        </span>
                        <!-- 刪除產品 -->
                        <i class="bi bi-trash3-fill" :disabled="cartLoadingItem === item.product_id"
                            @click="removeCartItem(item.id)"></i>
                    </div>
                </div>
            </div>
            <p v-else class="text-center">尚未新增商品！</p>

            <div class="cartTotal" v-if="cart.total">
                <div class="d-flex justify-content-end justify-content-md-between align-items-center">
                    <div class="input-group">
                        <input type="text" class="form-control" :disabled="alreadySale" v-model="localCoupon" placeholder="請輸入優惠碼">
                        <button class="btn" type="button" @click="addCouponCode"
                        :disabled="alreadySale">
                            套用
                        </button>
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
                    <p class="text-end m-0 text-dark">折扣後價格
                        <span style="color: #9747ff;">NT$ </span>
                        <span class="bigPrice" style="color: #9747ff;">
                            {{ $filters.currency(cart.final_total) }}</span>
                    </p>
                </div>
            </div>
        </div>
        <!-- 客戶訂單資料 -->
        <div class="col-md-4 justify-content-center">
            <Form v-slot="{ errors }" @submit="createOrder" class="orderForm">
                <div class="scrollBarStyle">
                    <p>購買人訊息</p>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <Field id="email" name="email" type="email" class="form-control"
                            :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="email|required"
                            v-model="form.user.email"></Field>
                        <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
                    </div>

                    <div class="mb-3">
                        <label for="name" class="form-label">收件人姓名</label>
                        <Field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                            placeholder="請輸入姓名" rules="required" v-model="form.user.name"></Field>
                        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
                    </div>

                    <div class="mb-3">
                        <label for="tel" class="form-label">收件人電話</label>
                        <Field id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                            placeholder="請輸入電話" rules="required" v-model="form.user.tel"></Field>
                        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
                    </div>

                    <div class="mb-3">
                        <label for="address" class="form-label">收件人地址</label>
                        <Field id="address" name="地址" type="text" class="form-control"
                            :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入地址" rules="required"
                            v-model="form.user.address"></Field>
                        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
                    </div>

                    <div class="mb-3">
                        <label for="message" class="form-label">留言</label>
                        <textarea name="" id="message" class="form-control" cols="30" rows="10" v-model="form.message"
                            ref="myTextarea"></textarea>
                    </div>
                    <div class="text-center">
                        <button class="normalBtn">
                            建立訂單
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapWritableState } from 'pinia';
import productStore from '@/stores/productStore';
import statusStore from '@/stores/statusStore';
import cartStore from '@/stores/cartStore';
import couponStore from '@/stores/couponStore';

import Toast from '../components/ToastMessages.vue';

export default {
    data() {
        return {
            product: {},
            form: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: ''
                },
                message: '',
            },
            order_id: '',
        }
    },
    components: {
        Toast,
    },
    computed: {
        ...mapState(statusStore, ['isLoading', 'cartLoadingItem']),
        ...mapState(cartStore, ['cart']),
        ...mapState(couponStore, ['alreadySale']),
        ...mapWritableState(couponStore, {
            localCoupon: 'coupon_code',
        }),
    },
    methods: {
        ...mapActions(productStore, ['getProducts']),
        ...mapActions(cartStore, [
            'getCart',
            'removeCartItem',
            'updateCart'
        ]),
        ...mapActions(couponStore, ['addCouponCode']),
        getProduct(id) {
            this.$router.push(`/user/product/${id}`);
        },
        createOrder() {
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
            const order = this.form;
            this.$http.post(url, { data: order })
                .then((res) => {
                    this.order_id = res.data.orderId;
                    this.$router.push(`/user/checkout/${this.order_id}`);
                })
        },
        decrementQty(item) {
            if (item.qty > 1) {
                item.qty--;
                this.updateCart(item);
            }
        },
        incrementQty(item) {
            item.qty++;
            this.updateCart(item);
        },
    },
    created() {
        this.getProducts();
        this.getCart();
    },
}
</script>