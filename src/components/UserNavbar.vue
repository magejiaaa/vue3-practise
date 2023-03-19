<template>
    <nav class="navbar navbar-expand-lg navbar-dark p-0 fixed-top | topMenu">
        <header class="container-fluid p-0">
            <h1 class="m-0 ms-1 ms-md-4 | logo">
                <router-link to="/" class="navbar-brand mb-0 h1 p-0" aria-current="page">亞馬烏羅提菜市場</router-link>
            </h1>
            <!-- 手機版 -->
            <button class="m-0 me-1 me-md-4 | mobileMenu" type="button" aria-expanded="false"
                @click="mobileMenuShow = !mobileMenuShow" :class="{ 'is-opened': mobileMenuShow }">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <transition name="menu">
                <div class="navbar-collapse justify-content-end me-lg-4 | showMenu" v-show="mobileMenuShow">
                    <ul class="navbar-nav | menu">
                        <li class="nav-item">
                            <router-link :to="{
                                name: 'AllProduct',
                                params: { pageName: '寵物' }
                            }" class=" active" aria-current="page">寵物販售</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{
                                name: 'AllProduct',
                                params: { pageName: '坐騎' }
                            }" class=" active" aria-current="page">坐騎販售</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/dashboard/coupon" class=" active" aria-current="page">代打帶練</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/dashboard/coupon" class=" active" aria-current="page">購買Gil</router-link>
                        </li>
                        <li class="nav-item" style="position: relative;" @mouseenter="isCartOpen = true;
                        isUserOpen = false;">
                            <span class="cartsLength" v-if="cart.carts">{{ cart.carts.length }}</span>
                            <router-link to="/dashboard/coupon" class=" active" aria-current="page">
                                <i class="bi bi-cart3"></i>
                                購物車
                            </router-link>
                            <div class="cartMenu">
                                <transition name="cartMenu">
                                    <ul class="cartPreview" v-if="cart.carts" @mouseleave="isCartOpen = false"
                                        v-show="isCartOpen">
                                        <li v-for="(item, id) in cart.carts" :key="id">
                                            <!-- 購物車刪除 -->
                                            <i class="bi bi-x-circle-fill" @click="emitCart(item.id)"
                                                :disabled="cartLoadingItem === item.id"></i>
                                            <div class="d-flex align-items-center w-100"
                                                @click="getProduct(item.product_id)">
                                                <div class="cartImg"
                                                    :style="{ backgroundImage: `url(${item.product.imagesUrl ? item.product.imagesUrl[0] : item.product.imageUrl})` }">
                                                </div>
                                                <div class="cartText">
                                                    <span>{{ item.product.title }}</span>
                                                    <span>x{{ item.qty }}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </transition>
                            </div>
                        </li>
                        <!-- 使用者選單手機版 -->
                        <li class="nav-item | mobileUserIcon">
                            <a class="nav-link">
                                <i class="bi bi-person-circle"></i>
                                使用者選單
                            </a>
                            <div class="userMenu_login">
                                <p>HI,目前尚未登入</p>
                                <router-link to="/login" class=" active" aria-current="page">請登入</router-link>
                            </div>
                        </li>
                    </ul>
                    <!-- 使用者選單 -->
                    <div class="userBtn" @mouseenter="isUserOpen = true;
                    isCartOpen = false;">
                        <a class="userIcon">
                            <i class="bi bi-person-circle"></i>
                        </a>
                        <div class="m-5 | userBtnDown" @mouseleave="isUserOpen = false">
                            <transition name="userBtnMenu">
                                <div class="userMenu_login" v-show="isUserOpen">
                                    <p>HI,目前尚未登入</p>
                                    <router-link to="/login" class=" active" aria-current="page">請登入</router-link>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </transition>

        </header>
    </nav>
</template>

<script>
export default {
    props: {
        cart: {
            type: Object,
            default() { return {}; },
        },
        cartLoadingItem: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            localcart: JSON.parse(JSON.stringify(this.cart)),
            // 驗證登入的吐司
            shown: false,
            // 下拉選單
            isUserOpen: false,
            isCartOpen: false,
            mobileMenuShow: false,
        }
    },
    methods: {
        logout() {
            const api = `${process.env.VUE_APP_API}logout`;
            this.$http.post(api, this.user)
                .then((res) => {
                    if (res.data.success) {
                        if (!this.shown) {
                            this.emitter.emit('push-message', {
                                style: 'success',
                                title: '登出成功',
                            });
                            this.shown = true;
                        }
                        this.$router.push('/login');
                    }
                });
        },
        // 點選產品帶入產品ID
        getProduct(id) {
            this.$router.push({
                path: `/user/product/${id}`,
                params: { productId: id }
            });
        },
        // 將更新的購物車傳給userBoard
        emitCart(id) {
            this.$emit('navCart', id);
        },
    },
}
</script>