<template>
    <UserMenu :cart="cart"></UserMenu>
    <div class="container-fluid">
        <router-view />
    </div>
</template>

<script>
import emitter from '@/methods/emitter';

import { mapState, mapActions } from 'pinia';
import statusStore from '@/stores/statusStore';
import cartStore from '@/stores/cartStore';

export default {
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

// export default {
//     data() {
//         return {
//             cart: [],
//         };
//     },
//     setup() {
//         provide('emitter', emitter);

//         const cartStore = useCartStore();
//         onMounted(async () => {
//             await cartStore.getCart();
//             this.cart = cartStore.cart;
//         });
//     }
// };
</script>