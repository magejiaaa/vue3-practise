<template>
    <Loading :active="isLoading"></Loading>
    <Toast></Toast>
    <!-- 正文內容 -->
    <table class="table mt-4">
        <thead>
            <tr>
                <th width="120">購買時間</th>
                <th>Email</th>
                <th width="200">購買品項</th>
                <th width="120">應付金額</th>
                <th width="120">是否付款</th>
                <th width="200">編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in orders" :key="item.id">
                <td>{{ item.create_at }}</td>
                <td>{{ item.user.email }}</td>
                <td class="text-right" v-for="product in item.products" :key="product.id">
                    {{ getProductTitle(product.product_id) }}
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
import { useProductStore } from '@/stores/store';
import { mapState } from 'pinia';


export default {
    data() {
        return {
            orders: [
                {
                    "create_at": 1523539834,
                    "id": "-L9u2EUkQSoEmW7QzGLF",
                    "is_paid": true,
                    "message": "這是留言",
                    "paid_date": 1523539924,
                    "payment_method": "credit_card",
                    "products": {
                        "L8nBrq8Ym4ARI1Kog4t": {
                            "id": "L8nBrq8Ym4ARI1Kog4t",
                            "product_id": "-NO8dU6u2Mze0vUU3Fny",
                            "qty": "3"
                        }
                    },
                    "total": 100,
                    "user": {
                        "address": "kaohsiung",
                        "email": "test@gmail.com",
                        "name": "test",
                        "tel": "0912346768"
                    },
                    "num": 1
                },
                {
                    "create_at": 1523539834,
                    "id": "-L9u2EUkQSoEmW7QzGLF",
                    "is_paid": true,
                    "message": "這是留言",
                    "paid_date": 1523539924,
                    "payment_method": "credit_card",
                    "products": {
                        "L8nBrq8Ym4ARI1Kog4t": {
                            "id": "L8nBrq8Ym4ARI1Kog4t",
                            "product_id": "-L8moRfPlDZZ2e-1ritQ",
                            "qty": "3"
                        }
                    },
                    "total": 100,
                    "user": {
                        "address": "kaohsiung",
                        "email": "test@gmail.com",
                        "name": "test",
                        "tel": "0912346768"
                    },
                    "num": 2
                },
            ],
            productsList: [],
            pagination: {},
            tempOrder: {},
            isNew: false,
            isLoading: false,
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
        // 把產品資訊帶進來
        ...mapState(useProductStore, {
            localProducts: 'products',
        })
    },
    // mounted() {
    //     this.productsList = this.localProducts;
    // },
    methods: {
        getProductTitle(productId) {
            // console.log("Products:", this.Products);
            // 傳入訂單ID
            const product = this.productsList.filter((item) => item.id === productId);
            console.log(product)
            return product ? product.title : "Unknown";
        },
        getOrders(page = 1) {
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
            this.isLoading = true;
            // 第一個是路徑 第二個是送出的資料
            this.$http.get(api)
                .then((res) => {
                    if (res.data.success) {
                        this.isLoading = false;
                        // this.orders = res.data.orders;
                        this.pagination = res.data.pagination;
                    }
                });
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
            // 第一個是路徑 第二個是送出的資料
            this.$http.put(api, { data: this.tempOrder })
                .then((response) => {
                    this.isLoading = false;
                    // console.log(response);
                    orderComponent.hideModal();
                    // 傳送API訊息至吐司元件
                    if (response.data.success) {
                        this.getOrders();
                        this.emitter.emit('push-message', {
                            style: 'success',
                            title: '更新成功',
                        })
                    } else {
                        this.emitter.emit('push-message', {
                            style: 'danger',
                            title: '更新失敗',
                            content: response.data.message.join('、'),
                        })
                    }
                });
        },
        delProduct() {
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
            const delComponent = this.$refs.delModal;
            this.isLoading = true;
            // 第一個是路徑 第二個是送出的資料
            this.$http.delete(api)
                .then((response) => {
                    this.isLoading = false;
                    console.log(response.data);
                    delComponent.hideModal();
                    this.getOrders();
                    this.emitter.emit('push-message', {
                        style: 'danger',
                        title: '刪除成功',
                    })
                })
        },
    },
    created() {
        this.getOrders();
        this.productsList = this.localProducts;
    },
}
</script>