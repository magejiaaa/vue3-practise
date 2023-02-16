<template>
    <Loading :active="isLoading"></Loading>
    <Toast></Toast>
    <div class="text-end">
        <button class="btn btn-primary" type="button" @click="openModal(true)">
            新增訂單
        </button>
    </div>
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
                <td class="text-right">
                    {{ $filters.currency(item.total) }}
                </td>
                <td class="text-right">
                    {{ $filters.currency(item.price) }}
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
                        <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
                        <button class="btn btn-outline-danger btn-sm" @click="delModal(item)">刪除</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <OrderModal ref="OrderModal" :product="tempOrder" @update-product="updatedProduct"></OrderModal>
    <DelModal ref="delModal" :item="tempOrder" @del-product="delProduct"></DelModal>
    <Pages :pages="pagination" @emit-pages="getOrders"></Pages>
</template>

<script>
import OrderModal from '../components/OrderModal.vue';
import DelModal from '../components/DelModal.vue';
import Toast from '../components/ToastMessages.vue';
import Pages from '../components/PagesList.vue';
import { mapState } from 'pinia';
import { useProductStore } from '@/stores/store';


export default {
    data() {
        return {
            orders: [],
            localProducts: [],
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
    methods: {
        getOrders(page = 1) {
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
            this.isLoading = true;
            // 第一個是路徑 第二個是送出的資料
            this.$http.get(api)
                .then((res) => {
                    if (res.data.success) {
                        this.isLoading = false;
                        // this.products = res.data.products;
                        this.pagination = res.data.pagination;
                    }
                });
        },
        openModal(isNew, item) {
            if (isNew) {
                this.tempProduct = {};
            } else {
                // 帶入產品資料
                this.tempProduct = { ...item };
            }
            this.isNew = isNew;
            const productComponent = this.$refs.OrderModal;
            productComponent.showModal();
        },
        delModal(item) {
            this.tempProduct = { ...item };
            const delComponent = this.$refs.delModal;
            delComponent.showModal();
        },
        updatedProduct(item) {
            this.tempProduct = item;
            // 新增
            let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
            let httpMethod = 'post';
            // 編輯判斷 & 修改
            if (!this.isNew) {
                api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
                httpMethod = 'put';
            }
            const productComponent = this.$refs.productModal;
            this.isLoading = true;
            // 第一個是路徑 第二個是送出的資料
            this.$http[httpMethod](api, { data: this.tempProduct })
                .then((response) => {
                    this.isLoading = false;
                    // console.log(response);
                    productComponent.hideModal();
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
    },
    computed: {
        ...mapState(useProductStore, {
            products: state => state.products,
        }),
    },
}
</script>