<template>
    <Loading :active="isLoading"></Loading>
    <div class="col-md-9 | dashboardPage">
        <Toast></Toast>
        <div class="stageTitle">
            <h3 class="m-0">產品管理</h3>
            <button class="normalBtn blueBtn" type="button" @click="openModal(true)">
                新增產品
            </button>
        </div>
        <ul class="responsive-table">
            <li class="table-header">
                <div class="col col-2">分類</div>
                <div class="col col-4">產品名稱</div>
                <div class="col text-center">原價</div>
                <div class="col text-center">售價</div>
                <div class="col col-1 text-center">是否啟用</div>
                <div class="col col-1 text-center">編輯</div>
                <div class="col col-1 text-center">刪除</div>
            </li>
            <li class="table-row" v-for="item in products" :key="item.id">
                <div class="col-4 col-md-2">{{ item.category }}</div>
                <div class="col-8 col-md-4 fw-bold">{{ item.title }}</div>
                <div class="col-4 col-md-1 | productListPrice"><span>原價</span>{{ $filters.currency(item.origin_price) }}
                </div>
                <div class="col-8 col-md-1 | productListPrice"><span>售價</span>{{ $filters.currency(item.price) }}</div>
                <div class="col-4 col-md-1 text-center">
                    <span class="text-success" v-if="item.is_enabled">啟用</span>
                    <span class="text-muted" v-else>未啟用</span>
                </div>
                <button class="col-4 col-md-1 text-center" style="color: #0C5DE3;" @click="openModal(false, item)">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="col-4 col-md-1 text-center" style="color: red;" @click="delModal(item)">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </li>
        </ul>

        <ProductModal ref="productModal" :product="tempProduct" @update-product="updatedProduct"></ProductModal>
        <DelModal ref="delModal" :item="tempProduct" @del-product="delProduct"></DelModal>
        <Pages :pages="pagination" @emit-pages="getProducts"></Pages>
    </div>
</template>

<script>
import ProductModal from '../components/ProductModal.vue';
import DelModal from '../components/DelModal.vue';
import Toast from '../components/ToastMessages.vue';
import Pages from '../components/PagesList.vue';

import { mapState, mapActions, mapWritableState } from 'pinia';
import statusStore from '@/stores/statusStore';
import productStore from '@/stores/productStore';


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
    props: {
        loginState: {
            type: Boolean,
        }
    },
    computed: {
        ...mapState(productStore, ['products', 'pagination']),
        ...mapState(statusStore, ['isLoading']),
        ...mapWritableState(statusStore, ['pageType']),
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
        if (!this.loginState) {
            this.$router.push('/login');
        }
        this.getProducts();
        this.pageType = 'product';
    },
}
</script>