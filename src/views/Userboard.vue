<template>
    <UserMenu :needLoginPage="loginPage" :cart="cart" :cartLoadingItem="cartLoadingItem" @navCart="handleNavCart" @menuType="changePage"></UserMenu>
    <div class="userboardCss">
        <div class="container-fluid">
            <router-view></router-view>
        </div>
        <FooterBox @menuType="changePage"></FooterBox>
    </div>
</template>

<script>
import emitter from '@/methods/emitter';
import FooterBox from '../components/footer.vue';

import { mapState, mapActions } from 'pinia';
import statusStore from '@/stores/statusStore';
import cartStore from '@/stores/cartStore';

export default {
    components: {
        FooterBox,
    },
    data() {
        return {
            loginPage: false,
            localPageName: '',
        };
    },
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
        ...mapActions(statusStore, ['changePageType']),
        ...mapActions(cartStore, ['getCart', 'removeCartItem']),
        handleNavCart(id) {
            this.removeCartItem(id);
        },
        changePage(type) {
            this.changePageType(type);
        }
    },
    created() {
        this.getCart();
    },
}

</script>