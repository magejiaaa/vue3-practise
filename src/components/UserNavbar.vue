<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary p-0 fixed-top">
        <header class="container-fluid p-0">
            <h1 class="m-0 ms-4 | logo">
                <a href="#" class="navbar-brand mb-0 h1 p-0">
                    亞馬烏羅提菜市場
                </a>
            </h1>
            <!-- 手機版 -->
            <button class="navbar-toggler me-4 | mobileMenu" type="button"
            aria-expanded="false"
            @click="mobileMenuShow = !mobileMenuShow">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-end me-4"
            :class="{'show':mobileMenuShow}">
                <ul class="navbar-nav | menu">
                    <li class="nav-item">
                        <router-link to="/dashboard/products" class=" active" aria-current="page">寵物販售</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/dashboard/order" class=" active" aria-current="page">坐騎販售</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/dashboard/coupon" class=" active" aria-current="page">代打帶練</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/dashboard/coupon" class=" active" aria-current="page">購買Gil</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/dashboard/coupon" class=" active" aria-current="page">
                            <i class="bi bi-cart3"></i>
                            購物車
                        </router-link>
                    </li>
                </ul>
                <!-- 使用者選單 -->
                <div class="userBtn"
                @mouseenter="isUserOpen = true">
                    <a class="userIcon">
                        <i class="bi bi-person-circle"></i>
                    </a>
                    <div class="m-5 | userBtnDown"
                    @mouseleave="isUserOpen = false">
                        <transition name="userBtnMenu">
                            <div class="userMenu_login" v-show="isUserOpen">
                                <p>HI,目前尚未登入</p>
                                <button>請登入</button>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </header>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            // 驗證登入的吐司
            shown: false,
            // 下拉選單
            isUserOpen: false,
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
        }
    }
}
</script>