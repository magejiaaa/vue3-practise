import { defineStore } from 'pinia'


export const useProductStore = defineStore({
    id:'product',
    state: () => ({
        products: [],
    }),
    getters: {
    },
    actions: {
        addProduct(newProduct) {
            this.products.push(newProduct);
        },
    },
});