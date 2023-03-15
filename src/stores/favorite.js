import { defineStore } from "pinia";

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
            // 尋找state中符合的ID
            const index = this.favoriteItem.findIndex((i) => i.id === item.id);
            if (index !== -1) {
                this.favoriteItem.splice(index, 1);
            }
            // 將狀態保存到 localStorage 中
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state.favoriteItem));
        },
        isFavorite(item) {
            return this.favoriteItem.some(fav => fav.id === item.id);
        },
        getLocalStorage() {
            const favoriteItem = JSON.parse(localStorage.getItem(STORAGE_KEY))
            if (favoriteItem) {
                this.favoriteItem = favoriteItem;
            }
        },
    },
})