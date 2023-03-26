<template>
    <nav class="navbar navbar-expand-lg navbar-dark p-0 fixed-top | topMenu" :class="{ 'lightMenu': needLoginPage }">
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
                    <ul class="navbar-nav | menu" @click="mobileMenuShow = !mobileMenuShow">
                        <li class="nav-item">
                            <router-link :to="{
                                name: 'AllProduct',
                                params: { pageName: '寵物' }
                            }" :class="{ 'active': pageName === '寵物' }">寵物販售</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{
                                name: 'AllProduct',
                                params: { pageName: '坐騎' }
                            }" :class="{ 'active': pageName === '坐騎' }">坐騎販售</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{
                                name: 'AllProduct',
                                params: { pageName: '代打代練' }
                            }" :class="{ 'active': pageName === '代打代練' }">代打帶練</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{
                                name: 'AllProduct',
                                params: { pageName: 'Gil' }
                            }" :class="{ 'active': pageName === 'Gil' }">購買Gil</router-link>
                        </li>
                        <li class="nav-item" style="position: relative;" @mouseenter="cartPreviewOpen">
                            <span class="cartsLength" v-if="cart.carts">{{ cart.carts.length }}</span>
                            <router-link to="/user/cart">
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
                                        <router-link to="/user/cart" class="checkCart">結帳</router-link>
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
                            <div class="userMenu_loggedIn">
                                <p v-if="!isLogin">HI,目前尚未登入</p>
                                <p v-else>HI,會飛的和牛</p>
                                <router-link to="/dashboard/favorite" @click="emitPage('favorite')">我的收藏</router-link>
                                <router-link to="/dashboard/order" @click="emitPage('userOrder')">查看訂單</router-link>
                                <router-link v-if="isLogin" to="/dashboard/products"
                                    @click="emitPage('product')">賣家專區</router-link>
                                <a v-else href="#" @click.prevent="logout()">登出</a>
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
                                <div class="userMenu_loggedIn" v-show="isUserOpen">
                                    <p v-if="!isLogin">HI,目前尚未登入</p>
                                    <p v-else>HI,會飛的和牛</p>
                                    <router-link to="/dashboard/favorite" @click="emitPage('favorite')">我的收藏</router-link>
                                    <router-link to="/dashboard/order" @click="emitPage('userOrder')">查看訂單</router-link>
                                    <router-link v-if="isLogin" to="/dashboard/products"
                                        @click="emitPage('product')">賣家專區</router-link>
                                    <router-link v-if="!isLogin" to="/login">請登入</router-link>
                                    <a v-else href="#" @click.prevent="logout()">登出</a>
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
        },
        needLoginPage: {
            type: Boolean,
            default: false
        },
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
            isLogin: false,
            pageType: '',
            pageName: '',
        }
    },
    watch: {
        "$route"(to) {
            this.pageName = to.params.pageName;
        }
    },
    methods: {
        logout() {
            const api = `${process.env.VUE_APP_API}logout`;
            this.$http.post(api, this.user)
                .then((res) => {
                    if (res.data.success) {
                        if (!this.shown) {
                            this.shown = true;
                        }
                        this.isLogin = false;
                        this.$router.go();
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
        // 購物車有物品才展開
        cartPreviewOpen() {
            this.isUserOpen = false;
            if (this.cart.carts.length > 0) {
                this.isCartOpen = true;
            }
        },
        emitPage(type) {
            this.$emit('menuType', type);
            this.pageType = type;
        },
        handleRouteChange() {
            this.pageName = this.$route.params.pageName;
        }
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
                if (res.data.success) {
                    this.isLogin = true;
                    this.$emit('loginState', this.isLogin);
                }
            });
    },
}
</script>