<template>
    <UserMenu :needLoginPage="loginPage" :cart="cart" :cartLoadingItem="cartLoadingItem"
    @navCart="handleNavCart" @menuType="changePage" @loginState="isLogin">
    </UserMenu>
    <div class="container-fluid">
        <div class="row | dashInnerPage">
            <SecondMenu :pageType="pageType" @menuType="changePage"></SecondMenu>
            <router-view :loginState="loginState"></router-view>
        </div>
    </div>
</template>

<script>
import UserMenu from "../components/UserNavbar.vue";
import SecondMenu from '../components/SecondMenu.vue';
import emitter from '@/methods/emitter';

import { mapState, mapActions } from 'pinia';
import statusStore from '@/stores/statusStore';
import cartStore from '@/stores/cartStore';

export default {
    data() {
        return {
            // 偵測menu背景用
            loginPage: true,
            loginState: false,
        };
    },
    components: {
        UserMenu,
        SecondMenu,
    },
    // 可讓內層元件使用外層功能
    provide() {
        return {
            emitter,
        };
    },
    computed: {
        ...mapState(statusStore, ['isLoading', 'cartLoadingItem', 'pageType']),
        ...mapState(cartStore, ['cart']),
    },
    methods: {
        ...mapActions(statusStore, ['changePageType', 'pushToLogin']),
        ...mapActions(cartStore, ['getCart', 'removeCartItem']),
        handleNavCart(id) {
            this.removeCartItem(id);
        },
        changePage(type) {
            this.changePageType(type);
        },
        isLogin(state) {
            this.loginState = state;
        }
    },
    created() {
        // 獲取hexToken中的cookie的值
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        // console.log(token);
        // 在header裡面放全域HTTP請求token
        this.$http.defaults.headers.common.Authorization = token;
        // 驗證到沒登入就跳轉
        if (this.pageType && (this.pageType.includes('product') || this.pageType.includes('order') || this.pageType.includes('coupon'))) {
            const api = `${process.env.VUE_APP_API}api/user/check`;
            this.$http.post(api, this.user)
                .then((res) => {
                    console.log(res);
                    // if (!res.data.success) {
                    //     this.$router.push('/login');
                    // }
                });
        }
        this.loginState = Boolean(this.$route.query.loginState);
        this.getCart();
    }
};
</script>