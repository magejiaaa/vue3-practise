<template>
    <Loading :active="isLoading"></Loading>
    <div class="col-md-9 | dashboardPage">
        <Toast></Toast>
        <div class="stageTitle">
            <h3 class="m-0">優惠券管理</h3>
            <button class="normalBtn blueBtn" type="button" @click="openModal(true)">
                新增優惠券
            </button>
        </div>
        <ul class="responsive-table">
            <li class="table-header text-center">
                <div class="col col-3">名稱</div>
                <div class="col col-2">折扣百分比</div>
                <div class="col">到期日</div>
                <div class="col col-2">是否啟用</div>
                <div class="col col-1">編輯</div>
                <div class="col col-1">刪除</div>
            </li>
            <li class="table-row" v-for="(item, key) in coupons" :key="key">
                <div class="col col-3">{{ item.title }}</div>
                <div class="col col-2 fw-bold text-center">{{ item.percent }}%</div>
                <div class="col text-center">{{ $filters.date(item.due_date) }}</div>

                <div class="col col-2 text-center">
                    <span class="text-success" v-if="item.is_enabled">啟用</span>
                    <span class="text-muted" v-else>未啟用</span>
                </div>
                <button class="col col-1 text-center" style="color: #0C5DE3;" @click="openModal(false, item)">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="col col-1 text-center" style="color: red;" @click="delModal(item)">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </li>
        </ul>

        <CouponModal ref="couponModal" :coupon="tempCoupon" @update-coupon="updatedCoupon"></CouponModal>
        <DelModal ref="delModal" :item="tempCoupon" @del-coupon="delCoupons"></DelModal>
        <Pages :pages="pagination" @emit-pages="getCoupons"></Pages>
    </div>
</template>

<script>
import CouponModal from '../components/CouponModal.vue';
import DelModal from '../components/DelModal.vue';
import Toast from '../components/ToastMessages.vue';
import Pages from '../components/PagesList.vue';

import { mapActions, mapWritableState } from 'pinia';
import statusStore from '@/stores/statusStore';


export default {
    data() {
        return {
            coupons: [],
            pagination: {},
            tempCoupon: {
                title: '',
                is_enabled: 0,
                percent: 100,
                code: '',
            },
            isNew: false,
            isLoading: false,
        };
    },
    components: {
        CouponModal,
        DelModal,
        Toast,
        Pages,
    },
    props: {
        loginState: {
            type: Boolean,
        }
    },
    inject: ['emitter'],
    computed: {
        ...mapWritableState(statusStore, ['pageType']),
    },
    methods: {
        ...mapActions(statusStore, ['pushMessage']),
        getCoupons(page = 1) {
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
            this.isLoading = true;
            // 第一個是路徑 第二個是送出的資料
            this.$http.get(api)
                .then((res) => {
                    if (res.data.success) {
                        this.isLoading = false;
                        this.coupons = res.data.coupons;
                        this.pagination = res.data.pagination;
                    }
                });
        },
        openModal(isNew, item) {
            if (isNew) {
                this.tempCoupon = {};
            } else {
                // 帶入產品資料
                this.tempCoupon = { ...item };
            }
            this.isNew = isNew;
            const productComponent = this.$refs.couponModal;
            productComponent.showModal();
        },
        delModal(item) {
            this.tempCoupon = { ...item };
            const delComponent = this.$refs.delModal;
            delComponent.showModal();
        },
        updatedCoupon(item) {
            this.tempCoupon = item;
            // 新增
            let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
            let httpMethod = 'post';
            // 編輯判斷 & 修改
            if (!this.isNew) {
                api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
                httpMethod = 'put';
            }
            const couponComponent = this.$refs.couponModal;
            this.isLoading = true;
            // 第一個是路徑 第二個是送出的資料
            this.$http[httpMethod](api, { data: this.tempCoupon })
                .then((response) => {
                    this.isLoading = false;
                    // console.log(response);
                    couponComponent.hideModal();
                    this.getCoupons();
                    // 傳送API訊息至吐司元件
                    const data = { title: response.data.message };
                    this.pushMessage(data);
                });
        },
        delCoupons() {
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
            const delComponent = this.$refs.delModal;
            this.isLoading = true;
            // 第一個是路徑 第二個是送出的資料
            this.$http.delete(api)
                .then((response) => {
                    this.isLoading = false;
                    console.log(response.data);
                    delComponent.hideModal();
                    this.getCoupons();
                    const data = { title: response.data.message };
                    this.pushMessage(data);
                })
        },
    },
    created() {
        if (!this.loginState) {
            this.$router.push('/login');
        }
        this.getCoupons();
        this.pageType = 'coupon';
    },
}
</script>