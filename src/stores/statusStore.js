import { defineStore } from "pinia";

export default defineStore('statusStore', {
    state: () => ({
        isLoading: false,
        // 加到購物車的Loading
        cartLoadingItem: '',
        messages: [],
    }),
    actions: {
        pushMessage(data) {
            const { title, content, style = 'success' } = data;
            this.messages.push({ style, title, content });
        }
    },
})