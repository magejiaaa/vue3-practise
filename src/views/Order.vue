<template>
    <Loading :active="isLoading"></Loading>
    <Toast></Toast>
    <!-- 正文內容 -->
    <table class="table mt-4" v-if="AllProducts">
        <thead>
            <tr>
                <th width="120">購買時間</th>
                <th width="18%">Email</th>
                <th>購買品項</th>
                <th width="120">應付金額</th>
                <th width="120">是否付款</th>
                <th width="200">編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in orders" :key="item.id">
                <td>{{ $filters.date(item.create_at) }}</td>
                <td>{{ item.user.email }}</td>
                <td class="text-right">
                    <p class="mb-0" v-for="orderPro in item.products" :key="orderPro.id">
                        {{ orderPro.product?.title }} / {{ orderPro.qty }}{{ orderPro.product?.unit }}
                    </p>
                </td>
                <td class="text-right">
                    {{ $filters.currency(item.total) }}
                </td>
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" :checked="item.is_paid" id="is_paid">
                        <label class="form-check-label" for="is_paid" v-if="item.is_paid">已付款
                        </label>
                        <label class="form-check-label" for="is_paid" v-else>未付款
                        </label>
                    </div>
                </td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-outline-primary btn-sm" @click="openModal(item)">編輯</button>
                        <button class="btn btn-outline-danger btn-sm" @click="delModal(item)">刪除</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <OrderModal ref="OrderModal" :order-outside="tempOrder" @update-order="updatedOrder"></OrderModal>
    <DelModal ref="delModal" :item="tempOrder" @del-product="delProduct"></DelModal>
    <Pages :pages="pagination" @emit-pages="getOrders"></Pages>
</template>

<script>
import OrderModal from '../components/OrderModal.vue';
import DelModal from '../components/DelModal.vue';
import Toast from '../components/ToastMessages.vue';
import Pages from '../components/PagesList.vue';

import { mapState, mapActions } from 'pinia';
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
    inject: ['emitter'],
    computed: {
        ...mapState(productStore, ['AllProducts']),
    },
    methods: {
        ...mapActions(productStore, ['getAllProducts']),
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
                    this.$httpMessageState(response, '更新付款狀態');
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
                    this.$httpMessageState(response, '刪除');
                })
        },
    },
    created() {
        this.getOrders();
    },
}
</script>