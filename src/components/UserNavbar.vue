<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary p-0 fixed-top">
        <header class="container-fluid p-0">
            <h1 class="m-0 | logo">
                <a href="#" class="navbar-brand mb-0 h1 p-0">
                    亞馬烏羅提菜市場
                </a>
            </h1>
            <!-- 手機版 -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-end me-4" id="navbarNav">
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
                <div class="userBtn">
                    <a class="userIcon">
                            <i class="bi bi-person-circle"></i>
                    </a>
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