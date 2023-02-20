<template>
    <Loading :active="isLoading"></Loading>
    <Toast></Toast>
    <div class="text-end">
        <button class="btn btn-primary" type="button" @click="openModal(true)">
            建立新的優惠券
        </button>
    </div>
    <table class="table mt-4">
        <thead>
            <tr>
                <th width="120">名稱</th>
                <th>折扣百分比</th>
                <th width="120">到期日</th>
                <th width="100">是否啟用</th>
                <th width="200">編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, key) in coupons" :key="key">
                <td>{{ item.title }}</td>
                <td>{{ item.percent }}%</td>
                <td class="text-right">
                    {{ $filters.date(item.due_date) }}
                </td>
                <td>
                    <span class="text-success" v-if="item.is_enabled">啟用</span>
                    <span class="text-muted" v-else>未啟用</span>
                </td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
                        <button class="btn btn-outline-danger btn-sm" @click="delModal(item)">刪除</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <CouponModal ref="couponModal" :coupon="tempCoupon" @update-coupon="updatedCoupon"></CouponModal>
    <DelModal ref="delModal" :item="tempCoupon" @del-coupon="delCoupons"></DelModal>
    <Pages :pages="pagination" @emit-pages="getCoupons"></Pages>
</template>

<script>
import CouponModal from '../components/CouponModal.vue';
import DelModal from '../components/DelModal.vue';
import Toast from '../components/ToastMessages.vue';
import Pages from '../components/PagesList.vue';


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
    inject: ['emitter'],
    methods: {
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
                    this.$httpMessageState(response, '更新優惠券資料');
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
                    this.$httpMessageState(response, '刪除優惠券資料');
                })
        },
    },
    created() {
        this.getCoupons();
    },
}
</script>