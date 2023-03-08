<template>
    <div class="container-fluid pt-5 | loginBox">
        <form class="row justify-content-center"
        @submit.prevent="signIn">
            <div class="col-md-5 | loginImg"></div>
            <div class="col-md-5 | enterUser">
                <h1 class="font-weight-normal">會員登入</h1>
                <h3>Login</h3>
                <div class="mb-3 d-flex | inputModel">
                    <label for="inputEmail" class="inputIcon">
                        <i class="bi bi-person-circle"></i>
                    </label>
                    <input type="email" id="inputEmail" class="form-control" placeholder="請輸入帳號"
                    v-model="user.username"
                    required
                    autofocus />
                </div>
                <div class="mb-3 d-flex | inputModel">
                    <label for="inputPassword" class="inputIcon">
                        <i class="bi bi-lock-fill"></i>
                    </label>
                    <input type="password" id="inputPassword" class="form-control" placeholder="請輸入密碼"
                    v-model="user.password"
                    required />
                </div>
                <div class="text-end">
                    <a href="#">忘記密碼</a>
                </div>
                <div class="mt-4 text-center">
                    <button class="normalBtn" type="submit">登入</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                username: '',
                password: '',
            },
        };
    },
    methods: {
        signIn() {
            const api = `${process.env.VUE_APP_API}admin/signin`;
            // console.log(api);
            // 第一個是路徑 第二個是送出的資料
            this.$http.post(api, this.user)
            .then((res) => {
                if (res.data.success) {
                    const { token, expired } = res.data;
                    // console.log( token, expired );
                    document.cookie = `hexToken=${token}; expirex=${new Date(expired)}`;
                    // console.log(res);
                    this.$router.push('/dashboard/products');
                }
            });
        },
    },
}
</script>