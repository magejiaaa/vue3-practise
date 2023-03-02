<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">控制台管理</span>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/dashboard/products" class="nav-link active" aria-current="page">產品</router-link> 
                    </li>
                    <li class="nav-item">
                        <router-link to="/dashboard/order" class="nav-link active" aria-current="page">訂單</router-link> 
                    </li>
                    <li class="nav-item">
                        <router-link to="/dashboard/coupon" class="nav-link active" aria-current="page">優惠券</router-link> 
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="logout">登出</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            shown: false,
        }
    },
    methods: {
        logout() {
            const api = `${process.env.VUE_APP_API}logout`;
            // console.log(api);
            // 第一個是路徑 第二個是送出的資料
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