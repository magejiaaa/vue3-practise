<template>
    <div class="container mt-5">
        <form class="row justify-content-center"
        @submit.prevent="signIn">
            <div class="col-md-6">
                <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
                <div class="mb-2">
                    <label for="inputEmail" class="sr-only">Email address</label>
                    <input type="email" id="inputEmail" class="form-control" placeholder="Email address"
                    v-model="user.username"
                    required
                    autofocus />
                </div>
                <div class="mb-2">
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password"
                    v-model="user.password"
                    required />
                </div>

                <div class="text-end mt-4">
                    <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
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