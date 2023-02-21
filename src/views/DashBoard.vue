<template>
    <Navbar></Navbar>
    <div class="container-fluid">
        <router-view />
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import emitter from '@/methods/emitter';

export default {
    data() {
        return {
            productData: [],
        };
    },
    components: {
        Navbar,
    },
    // 可讓內層元件使用外層功能
    provide() {
        return {
            emitter,
        };
    },
    created() {
        // 獲取hexToken中的cookie的值
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        // console.log(token);
        // 在header裡面放全域HTTP請求token
        this.$http.defaults.headers.common.Authorization = token;
        // 驗證到沒登入就跳轉
        const api = `${process.env.VUE_APP_API}api/user/check`;
        this.$http.post(api, this.user)
            .then((res) => {
                // console.log(res);
                if (!res.data.success) {
                    this.$router.push('/login');
                }
            });
    }
};
</script>