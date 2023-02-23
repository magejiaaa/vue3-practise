import axios from "axios";
import { defineStore } from "pinia";
import statusStore from '@/stores/statusStore';

const status = statusStore();

export default defineStore('productStore', {
    state: () => ({
        products: [],
    }),
    getters: {
        sortProduct: (state) => state.products.sort((a, b) => a.price - b.price)
    },
    actions: {
        // 可以使用this存取state資料
        getProducts() {
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
            status.isLoading = true;
            axios.get(api)
                .then((res) => {
                    if (res.data.success) {
                        status.isLoading = false;
                        this.products = res.data.products;
                    }
                });
        },
    }
})