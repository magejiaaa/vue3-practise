<template>
    <!-- 負責定位+列表 -->
    <div class="toast-container position-absolute pe-3 mt-3 end-0">
      <Toast v-for="(msg, key) in messages" :key="key"
        :msg="msg"
      />
    </div>
</template>
  
<script>
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import Toast from '@/components/Toast.vue';
import statusStore from '@/stores/statusStore';

export default {
  components: { Toast },
  setup() {
    const status = statusStore();
    const { messages } = storeToRefs(status);
    onMounted(() => {
      status.cleanMessage();
    })

    return {
      messages
    }
  },
};
</script>