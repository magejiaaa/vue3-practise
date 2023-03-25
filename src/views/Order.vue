<template>
    <Loading :active="isLoading"></Loading>
    <div class="col-md-9 | dashboardPage" v-if="AllProducts">
        <Toast></Toast>
        <div class="stageTitle">
            <h3 class="m-0">訂單管理</h3>
        </div>
        <ul class="responsive-table">
            <li class="table-header text-center">
                <div class="col col-2">建立日期</div>
                <div class="col col-3">e-mail</div>
                <div class="col col-3">訂單內容</div>
                <div class="col col-1">總價</div>
                <div class="col col-2">是否付款</div>
                <div class="col" v-if="pageType === 'order'">編輯</div>
                <div class="col" v-if="pageType === 'order'">刪除</div>
            </li>
            <li class="table-row | orderList" v-for="item in orders" :key="item.id">
                <div class="col col-4 col-lg-2 text-lg-center">{{ $filters.date(item.create_at) }}</div>
                <div class="col col-8 col-lg-3 fw-bold" style="word-wrap: break-word;">{{ item.user.email }}</div>
                <div class="col col-8 col-lg-3">
                    <p class="mb-0" v-for="orderPro in item.products" :key="orderPro.id">
                        {{ orderPro.product?.title }} / {{ orderPro.qty }}{{ orderPro.product?.unit }}
                    </p>
                </div>
                <div class="col col-4 col-lg-1 text-center">NT$ {{ $filters.currency(item.total) }}</div>
                <!-- 不須登入 -->
                <div class="col col-lg-2 text-center" v-if="pageType === 'userOrder'">
                    <span v-if="item.is_paid">已付款</span>
                    <button class="normalBtn" @click.prevent="goToPay(item.id)" v-else>前往付款</button>
                </div>
                <!-- 有登入 -->
                <div class="col col-lg-2 form-check form-switch | mobileListBtn1" v-else>
                    <input class="form-check-input" type="checkbox" id="is_paid" v-model="item.is_paid"
                        @click="changePaid(item)">
                    <label class="form-check-label" for="is_paid" v-if="item.is_paid">已付款
                    </label>
                    <label class="form-check-label" for="is_paid" v-else>未付款
                    </label>
                </div>
                <!-- 編輯 -->
                <button class="col text-center | mobileListBtn2" style="color: #0C5DE3;" @click="openModal(item)"
                    v-if="pageType === 'order'">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <!-- 刪除 -->
                <button class="col text-center | mobileListBtn3" style="color: red;" @click="delModal(item)"
                    v-if="pageType === 'order'">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </li>
        </ul>

        <OrderModal ref="OrderModal" :order-outside="tempOrder" @update-order="updatedOrder"></OrderModal>
        <DelModal ref="delModal" :item="tempOrder" @del-product="delProduct"></DelModal>
        <Pages :pages="pagination" @emit-pages="getOrders"></Pages>
    </div>
</template>

<script>
import OrderModal from '../components/OrderModal.vue';
import DelModal from '../components/DelModal.vue';
import Toast from '../components/ToastMessages.vue';
import Pages from '../components/PagesList.vue';

import { mapState, mapActions, mapWritableState } from 'pinia';
import statusStore from '@/stores/statusStore';
import productStore from '@/stores/productStore';


export default {
    data() {
        return {
            orders: [],
            pagination: {},
            tempOrder: {},
            isNew: false,
            isLoading: false,
            pages: 1,
        };
    },
    components: {
        OrderModal,
        DelModal,
        Toast,
        Pages,
    },
    props: {
        loginState: {
            type: Boolean,
        }
    },
    inject: ['emitter'],
    computed: {
        ...mapState(productStore, ['AllProducts']),
        ...mapWritableState(statusStore, ['pageType']),
    },
    methods: {
        ...mapActions(productStore, ['getAllProducts']),
        ...mapActions(statusStore, ['pushMessage']),
        getOrders(pages = 1) {
            this.pages = pages;
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${pages}`;
            this.isLoading = true;
            // 第一個是路徑 第二個是送出的資料
            this.$http.get(api)
                .then((res) => {
                    if (res.data.success) {
                        this.isLoading = false;
                        this.orders = res.data.orders;
                        this.pagination = res.data.pagination;
                        // 取得產品資料
                        this.getAllProducts();
                    }
                })
        },
        openModal(item) {
            this.tempOrder = {};
            // 帶入產品資料
            this.tempOrder = { ...item };
            const orderComponent = this.$refs.OrderModal;
            orderComponent.showModal();
        },
        delModal(item) {
            this.tempProduct = { ...item };
            const delComponent = this.$refs.delModal;
            delComponent.showModal();
        },
        updatedOrder(item) {
            this.tempOrder = item;
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
            const orderComponent = this.$refs.OrderModal;
            this.isLoading = true;
            const paid = {
                is_paid: item.is_paid,
            };
            // 第一個是路徑 第二個是送出的資料
            this.$http.put(api, { data: paid })
                .then((response) => {
                    this.isLoading = false;
                    this.getOrders(this.pages);
                    // console.log(response);
                    orderComponent.hideModal();
                    // 傳送API訊息至吐司元件
                    const data = { title: response.data.message };
                    this.pushMessage(data);
                });
        },
        // 編輯訂單付款狀態
        changePaid(item) {
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
            this.isLoading = true;
            const paid = {
                is_paid: !item.is_paid,
            };
            this.$http.put(api, { data: paid })
                .then((response) => {
                    this.isLoading = false;
                    this.getOrders(this.pages);
                    // 傳送API訊息至吐司元件
                    const data = { title: response.data.message };
                    this.pushMessage(data);
                });
        },
        delProduct() {
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempProduct.id}`;
            const delComponent = this.$refs.delModal;
            this.isLoading = true;
            // 第一個是路徑 第二個是送出的資料
            this.$http.delete(api)
                .then((response) => {
                    this.isLoading = false;
                    console.log(response.data);
                    delComponent.hideModal();
                    this.getOrders();
                    const data = { title: response.data.message };
                    this.pushMessage(data);
                })
        },
        // 前往付款
        goToPay(orderID) {
            this.$router.push(`/user/checkout/${orderID}`);
        }
    },
    created() {
        if (this.pageType === 'order') {
            if (!this.loginState) {
                this.$router.push('/login');
            }
        }
        this.getOrders();
    },
}
</script>