<template>
    <UserMenu :cart="cart"></UserMenu>
    <div class="container-fluid">
        <router-view />
    </div>
    <FooterBox></FooterBox>
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
            // cart: {},
        };
    },
    provide() {
        return {
            emitter,
        };
    },
    computed: {
        ...mapState(statusStore, ['isLoading', 'cartLoadingItem']),
        ...mapState(cartStore, ['cart']),
    },
    methods: {
        ...mapActions(cartStore, ['getCart']),
    },
    created() {
        this.getCart();
    },
}

</script>