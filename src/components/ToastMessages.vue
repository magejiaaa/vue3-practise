<template>
    <!-- 負責定位+列表 -->
    <div class="toast-container position-absolute pe-3 top-0 end-0">
      <Toast v-for="(msg, key) in messages" :key="key"
        :msg="msg"
      />
    </div>
</template>
  
<script>
import Toast from '@/components/Toast.vue';

export default {
components: { Toast },
data() {
    return {
    messages: [],
    };
},
inject: ['emitter'],
mounted() {
    // 每次有外層傳來的回應資訊，就提取出來呈現
    this.emitter.on( 'push-message' , (message) => {
        const { style = 'success', title, content } = message;
        this.messages.push({ style, title, content });
    });
},
};
</script>