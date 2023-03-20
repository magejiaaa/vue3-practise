<template>
    <Loading :active="isLoading"></Loading>
    <!-- 購物車列表 -->
    <div class="row | innerPage">
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
            <div class="cartCard" v-if="cart.carts">
                <div class="card" v-for="(item, id) in cart.carts" :key="id">
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
                            <small v-if="cart.final_total !== cart.total" class="text-success">折扣價</small>
                            <br/>
                            NT$ {{ $filters.currency(item.final_total) }}
                        </span>
                        <i class="bi bi-trash3-fill" :disabled="cartLoadingItem === item.product_id"
                            @click="removeCartItem(item.product_id)"></i>
                    </div>
                </div>
            </div>
            <div class="cartTotal">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
                        <button class="btn" type="button" @click="addCouponCode">
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
                    <p class="text-end m-0">折扣後價格
                        <span>NT$ </span>
                        <span class="bigPrice">{{ $filters.currency(cart.final_total) }}</span>
                    </p>
                </div>
            </div>
        </div>
        <!-- 客戶訂單資料 -->
        <div class="col-md-4 justify-content-center">
            <Form v-slot="{ errors }" @submit="createOrder" class="orderForm">
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
                    <Field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
                        placeholder="請輸入地址" rules="required" v-model="form.user.address"></Field>
                    <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
                </div>

                <div class="mb-3">
                    <label for="message" class="form-label">留言</label>
                    <textarea name="" id="message" class="form-control" cols="30" rows="10"
                        v-model="form.message"></textarea>
                </div>
                <div class="text-center">
                    <button class="normalBtn">建立訂單</button>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import productStore from '@/stores/productStore';
import statusStore from '@/stores/statusStore';
import cartStore from '@/stores/cartStore';

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
            coupon_code: '',
        }
    },
    computed: {
        ...mapState(productStore, ['sortProduct']),
        ...mapState(statusStore, ['isLoading', 'cartLoadingItem']),
        ...mapState(cartStore, ['cart']),
    },
    methods: {
        ...mapActions(productStore, ['getProducts']),
        ...mapActions(cartStore, [
            'addCart',
            'getCart',
            'removeCartItem',
            'updateCart'
        ]),
        getProduct(id) {
            this.$router.push(`/user/product/${id}`);
        },
        addCouponCode() {
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
            const coupon = {
                code: this.coupon_code,
            }
            this.isLoading = true;
            this.$http.post(url, { data: coupon })
                .then((res) => {
                    console.log(res);
                    this.getCart();
                })
        },
        createOrder() {
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
            const order = this.form;
            this.$http.post(url, { data: order })
                .then((res) => {
                    console.log(res);
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