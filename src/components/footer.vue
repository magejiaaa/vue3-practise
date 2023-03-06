<template>
    <div class="footer">
        <div class="d-flex align-items-start justify-content-between text-start mb-5">
        <!-- LOGO -->
        <img :src="footerLogo" alt="">

        <!-- 網站地圖 -->
        <table class="table table-borderless | mapLink">
            <tr>
                <td>
                    <router-link to="/dashboard/products" class=" active" aria-current="page">我的收藏</router-link>
                </td>
                <td>
                    <router-link to="/dashboard/products" class=" active" aria-current="page">查看訂單</router-link>
                </td>
            </tr>
            <tr>
                <td>
                    <router-link to="/dashboard/products" class=" active" aria-current="page">寵物販售</router-link>
                </td>
                <td>
                    <router-link to="/dashboard/products" class=" active" aria-current="page">坐騎販售</router-link>
                </td>
                <td>
                    <router-link to="/dashboard/products" class=" active" aria-current="page">代打代練</router-link>
                </td>
                <td>
                    <router-link to="/dashboard/products" class=" active" aria-current="page">購買Gil</router-link>
                </td>
            </tr>
            <tr>
                <td>
                    <router-link to="/dashboard/products" class=" active" aria-current="page">產品管理</router-link>
                </td>
                <td>
                    <router-link to="/dashboard/products" class=" active" aria-current="page">優惠券管理</router-link>
                </td>
            </tr>
        </table>

        <!-- 公司詳細 -->
        <div class="company">
            <h6 class="fw-bold">古代人科技股份有限公司</h6>
            <p class="fw-light">
                地址：404 台中市西區華美街111號<br>
                電話：04-20222266
            </p>
        </div>
        </div>
        <!-- copyright -->
        <p class="mb-0 | copyright">FINAL FANTASY XIV © 2010 - 2020 SQUARE ENIX CO., LTD. All Rights Reserved.</p>
    </div>
</template>

<script>

export default {
    name: 'footer',
    data() {
        return {
            footerLogo: require('../assets/image/logo.png'),
        }
    },
}
</script>