<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary p-0 fixed-top">
        <header class="container-fluid p-0">
            <h1 class="m-0 ms-1 ms-md-4 | logo">
                <a href="#" class="navbar-brand mb-0 h1 p-0">
                    亞馬烏羅提菜市場
                </a>
            </h1>
        </header>
    </nav>
    <div class="container-fluid pt-5 | loginBox">
        <form class="row justify-content-center mt-5" @submit.prevent="signIn">
            <div class="col-12 col-md-5 col-lg-4 | loginImg"></div>
            <div class="col-12 col-md-5 col-lg-4 | enterUser">
                <div class="enterUserFlex">
                    <h1 class="font-weight-normal">會員登入</h1>
                    <h3>Login</h3>
                    <div class="mb-3 d-flex | inputModel">
                        <label for="inputEmail" class="inputIcon">
                            <i class="bi bi-person-circle"></i>
                        </label>
                        <input type="email" id="inputEmail" class="form-control" placeholder="請輸入帳號" v-model="user.username"
                            required autofocus />
                    </div>
                    <div class="mb-3 d-flex | inputModel">
                        <label for="inputPassword" class="inputIcon">
                            <i class="bi bi-lock-fill"></i>
                        </label>
                        <input type="password" id="inputPassword" class="form-control" placeholder="請輸入密碼"
                            v-model="user.password" required />
                    </div>
                    <div class="text-end | forgetPassword">
                        <a href="#">忘記密碼</a>
                    </div>
                    <div class="mt-5 text-center">
                        <button class="normalBtn bigBtn" type="submit">登入</button>
                        <a href="#" class="mobileSignBtn">註冊</a>
                    </div>
                </div>
            </div>
            <div class="p-0 | bookMark">
                <a href="#">登入</a>
                <a href="#">註冊</a>
            </div>
        </form>
        <p class="mb-0 | copyright" style="color: #9747FF;">FINAL FANTASY XIV © 2010 - 2020 SQUARE ENIX CO., LTD. All Rights Reserved.</p>
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
                        this.$router.back(1);
                    }
                });
        },
    },
}
</script>