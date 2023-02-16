import { defineStore } from 'pinia';


export const useProductStore = defineStore( 'product', {
    //定義狀態初始值
    state: () => ({
        products: [],
    }),
    //對狀態加工的 getters，如同 computed
    getters: {
    },
    //定義使用到的函式，可以為同步和非同步，如同 method
    actions: {
        addProduct(getProducts) {
            this.products = getProducts;
        },
    },
});