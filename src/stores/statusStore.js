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
            const { title = '成功', content, style = 'success' } = data;
            console.log(data);
            this.messages.push({ style, title, content });
        },
        cleanMessage() {
            this.messages = [];
        }
    },
})