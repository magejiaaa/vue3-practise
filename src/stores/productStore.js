import axios from "axios";
import { defineStore } from "pinia";
import statusStore from '@/stores/statusStore';

const status = statusStore();

export default defineStore('productStore', {
    state: () => ({
        products: [],
        AllProducts: [],
        pagination: {},
    }),
    getters: {
        sortProduct: (state) => state.products.sort((a, b) => a.price - b.price)
    },
    actions: {
        getAllProducts() {
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
            status.isLoading = true;
            axios.get(api)
                .then((res) => {
                    if (res.data.success) {
                        status.isLoading = false;
                        this.AllProducts = res.data.products;
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        // 可以使用this存取state資料
        getProducts(page = 1) {
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`;
            status.isLoading = true;
            axios.get(api)
                .then((res) => {
                    if (res.data.success) {
                        status.isLoading = false;
                        this.products = res.data.products;
                        this.pagination = res.data.pagination;
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        },
    }
})