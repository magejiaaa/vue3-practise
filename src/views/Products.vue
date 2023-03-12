<template>
    <Loading :active="isLoading"></Loading>
    <Toast></Toast>
    <div class="text-end">
        <button class="btn btn-primary" type="button" @click="openModal(true)">
            新增產品
        </button>
    </div>
    <table class="table mt-4">
        <thead>
            <tr>
                <th width="120">分類</th>
                <th>產品名稱</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="100">是否啟用</th>
                <th width="200">編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in products" :key="item.id">
                <td>{{ item.category }}</td>
                <td>{{ item.title }}</td>
                <td class="text-right">
                    {{ $filters.currency(item.origin_price) }}
                </td>
                <td class="text-right">
                    {{ $filters.currency(item.price) }}
                </td>
                <td>
                    <span class="text-success" v-if="item.is_enabled">啟用</span>
                    <span class="text-muted" v-else>未啟用</span>
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
    <ProductModal ref="productModal" :product="tempProduct" @update-product="updatedProduct"></ProductModal>
    <DelModal ref="delModal" :item="tempProduct" @del-product="delProduct"></DelModal>
    <Pages :pages="pagination" @emit-pages="getProducts"></Pages>
</template>

<script>
import ProductModal from '../components/ProductModal.vue';
import DelModal from '../components/DelModal.vue';
import Toast from '../components/ToastMessages.vue';
import Pages from '../components/PagesList.vue';
// import { storeToRefs } from 'pinia';
import { mapState, mapActions } from 'pinia';
import statusStore from '@/stores/statusStore';
import productStore from '@/stores/productStore';


// 解構使用的話
// const { products } = storeToRefs(productStore);
// console.log(products);

export default {
    data() {
        return {
            tempProduct: {},
            isNew: false,
        };
    },
    components: {
        ProductModal,
        DelModal,
        Toast,
        Pages,
    },
    computed: {
        ...mapState(productStore, ['products', 'pagination']),
        ...mapState(statusStore, ['isLoading']),
    },
    inject: ['emitter'],
    methods: {
        ...mapActions(productStore, ['getProducts']),
        ...mapActions(statusStore, ['pushMessage']),

        openModal(isNew, item) {
            if (isNew) {
                this.tempProduct = {};
            } else {
                // 帶入產品資料
                this.tempProduct = { ...item };
            }
            this.isNew = isNew;
            const productComponent = this.$refs.productModal;
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
            // 第一個是路徑 第二個是送出的資料
            this.$http[httpMethod](api, { data: this.tempProduct })
                .then((response) => {
                    productComponent.hideModal();
                    const page = this.pagination.current_page;
                    this.getProducts(page);
                    const data = { title: response.data.message };
                    this.pushMessage(data);
                });
        },
        delProduct() {
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
            const delComponent = this.$refs.delModal;
            // 第一個是路徑 第二個是送出的資料
            this.$http.delete(api)
                .then((response) => {
                    console.log(response.data);
                    delComponent.hideModal();
                    this.getProducts();
                    const data = { title: response.data.message };
                    this.pushMessage(data);
                })
        },
    },
    created() {
        this.getProducts();
    },
}
</script>