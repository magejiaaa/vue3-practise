import { defineStore } from "pinia";
import { getLocalStorage as localEnv } from "../methods/localStorage"

const STORAGE_KEY = 'favorite-store-state';

export default defineStore({
    id: 'favoriteStore',
    state: () => ({
        favoriteItem: [],
    }),
    actions: {
        addToFavorites(item) {
            const existingIndex = this.favoriteItem.findIndex((fav) => fav.id === item.id);
            if (existingIndex !== -1) {
                // 如果存在，不添加新的產品
                return;
            } else {
                // 如果不存在，添加新的產品
                this.favoriteItem.push(item);
                // 將狀態保存到 localStorage 中
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state.favoriteItem));
        },
        removeFromFavorites(item) {
            // 尋找state中符合的ID並返回索引位置
            const index = this.favoriteItem.findIndex((i) => i.id === item.id);
            // 找不到會返回-1
            if (index !== -1) {
                // 第二個參數是刪1個
                this.favoriteItem.splice(index, 1);
            }
            // 將狀態保存到 localStorage 中
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state.favoriteItem));
        },
        isFavorite(item) {
            // 尋找favoriteItem中符合item的ID
            // 作為判斷愛心變色用
            return this.favoriteItem.some(fav => fav.id === item.id);
        },
        getLocalStorage() {
            localEnv();
            // 將localStorage的值讀出來並轉為JS對象
            const favoriteItem = JSON.parse(localStorage.getItem(STORAGE_KEY))
            if (favoriteItem) {
                this.favoriteItem = favoriteItem;
            }
        },
    },
})