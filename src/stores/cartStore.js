import axios from "axios";
import { defineStore } from "pinia";
import statusStore from '@/stores/statusStore';

const status = statusStore();


export default defineStore('cartStore', {
    state: () => ({
        cart: {},
    }),
    actions: {
        // 可以使用this存取state資料
        // 檢查this相關的參數能不能用
        addCart(id, quantity = 1) {
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
            status.cartLoadingItem = id;
            // 要按照api的格式post
            const cart = {
                product_id: id,
                qty: quantity,
            }
            axios.post(url, { data: cart })
                .then((res) => {
                    status.cartLoadingItem = '';
                    console.log(res);
                    this.getCart();
                    const data = { title: res.data.message };
                    status.pushMessage(data);
                })
        },
        getCart() {
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
            status.isLoading = true;
            axios.get(url)
                .then((res) => {
                    if (res.data.success) {
                        this.cart = res.data.data;
                        status.isLoading = false;
                    }
                })
                .catch((error) => {
                    console.log(error);
                    const data = { title: '無法取得購物車列表', style: 'danger' };
                    status.pushMessage(data);
                })
        },
        removeCartItem(id) {
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
            status.cartLoadingItem = id;
            axios.delete(url)
                .then((res) => {
                    status.cartLoadingItem = '';
                    console.log(res);
                    this.getCart();
                    const data = { title: '購物車商品'+res.data.message };
                    status.pushMessage(data);
                })
        },
        updateCart(item) {
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item}`;
            status.isLoading = true;
            status.cartLoadingItem = item.id;
            // 要傳遞的資訊
            const cart = {
                product_id: item.product_id,
                qty: item.qty,
            };
            axios.put(url, { data: cart })
                .then((res) => {
                    if (res.data.success) {
                        status.cartLoadingItem = '';
                        console.log(res);
                        this.getCart();
                        // this.$httpMessageState(res, '更新購物車');
                    }
                })
        },
    }
})