import axios from "axios";
import { defineStore } from "pinia";
import cartStore from '@/stores/cartStore';
import statusStore from '@/stores/statusStore';

const carts = cartStore();
const status = statusStore();

export default defineStore('couponStore', {
    state: () => ({
        order: {
            products: {},
            user: {},
        },
        orderId: '',
        alreadySale: false,
        coupon_code: '',
    }),
    actions: {
        addCouponCode() {
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
            const coupon = {
                code: this.coupon_code,
            }
            status.isLoading = true;
            axios.post(url, { data: coupon })
            .then((res) => {
                console.log(res);
                this.alreadySale = true;
                carts.getCart();
                const data = { title: res.data.message };
                status.pushMessage(data);
            })
        },
        getCouponCode() {
            const productsArray = Object.values(this.order.products);
            const cartCode = productsArray[0];
            if (cartCode.coupon) {
                this.coupon_code = '優惠碼：' + cartCode.coupon.code;
            }
        },
        getOrders() {
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
            axios.get(url)
                .then((res) => {
                    if (res.data.success) {
                        this.order = res.data.order;
                        this.getCouponCode();
                    }
                })
        },
    }
})