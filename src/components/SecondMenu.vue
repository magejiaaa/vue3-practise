<template>
    <div class="col-md-3 | secondMenu">
        <ul class="p-0">
            <li class="secondTitle">買家專區</li>
            <li>
                <router-link to="/dashboard/favorite" @click="emitPage('favorite')"
                    :class="{ 'pageActive': pageType === 'favorite' }">
                    <i class="bi bi-heart"></i>我的收藏
                </router-link>
            </li>
            <li>
                <router-link to="/dashboard/order" @click="emitPage('userOrder')"
                    :class="{ 'pageActive': pageType === 'userOrder' }">
                    <i class="bi bi-file-earmark-text"></i>查看訂單
                </router-link>
            </li>
            <li class="secondTitle">賣家專區</li>
            <li class="blueMenu">
                <router-link to="/dashboard/products" @click="emitPage('product')"
                    :class="{ 'pageActive': pageType === 'product' }">
                    <i class="bi bi-box-seam"></i>產品管理
                </router-link>
            </li>
            <li class="blueMenu">
                <router-link to="/dashboard/order" @click="emitPage('order')"
                    :class="{ 'pageActive': pageType === 'order' }">
                    <i class="bi bi-file-earmark-text"></i>訂單管理
                </router-link>
            </li>
            <li class="blueMenu">
                <router-link to="/dashboard/coupon" @click="emitPage('coupon')"
                    :class="{ 'pageActive': pageType === 'coupon' }">
                    <i class="bi bi-ticket-perforated"></i>優惠券管理
                </router-link>
            </li>
        </ul>

        <!-- 手機版(只有賣家專區) -->
        <ul class="nav nav-tabs | mobileTabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <router-link to="/dashboard/products" class="nav-link"
                @click="emitPage('product')"
                :class="{ 'active': pageType === 'product' }">產品管理</router-link>
            </li>
            <li class="nav-item" role="presentation">
                <router-link to="/dashboard/order" class="nav-link"
                @click="emitPage('order')"
                :class="{ 'active': pageType === 'order' }">訂單管理</router-link>
            </li>
            <li class="nav-item" role="presentation">
                <router-link to="/dashboard/coupon" class="nav-link"
                @click="emitPage('coupon')"
                :class="{ 'active': pageType === 'coupon' }">優惠券管理</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        pageType: {
            type: String,
            default: '',
        }
    },
    methods: {
        emitPage(pageType) {
            this.$emit('menuType', pageType);
        }
    },
}
</script>