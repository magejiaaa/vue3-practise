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

export default {
    data() {
        return {
            products: [],
            pagination: {},
            tempProduct: {},
            isNew: false,
            isLoading: false,
        };
    },
    components: {
        ProductModal,
        DelModal,
        Toast,
        Pages,
    },
    inject: ['emitter'],
    methods: {
        getProducts(page = 1) {
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
            this.isLoading = true;
            // 第一個是路徑 第二個是送出的資料
            this.$http.get(api)
                .then((res) => {
                    if (res.data.success) {
                        this.isLoading = false;
                        this.products = res.data.products;
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
            this.isLoading = true;
            // 第一個是路徑 第二個是送出的資料
            this.$http[httpMethod](api, { data: this.tempProduct })
                .then((response) => {
                    this.isLoading = false;
                    // console.log(response);
                    productComponent.hideModal();
                    // 傳送API訊息至吐司元件
                    if (response.data.success) {
                        this.getProducts();
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
                    this.getProducts();
                    this.emitter.emit('push-message', {
                        style: 'danger',
                        title: '刪除成功',
                    })
                })
        },
    },
    created() {
        this.getProducts();
    },
}
</script>