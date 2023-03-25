<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content border-0 | productModel">
                <div class="text-end">
                    <button type="button" class="btn-close | modelClose" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <h3>編輯優惠券</h3>
                <!-- 優惠券內容 -->
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="title" class="form-label">優惠券名稱</label>
                        <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempCoupon.title">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="coupon_code" class="form-label">折扣百分比</label>
                        <input type="number" class="form-control" id="coupon_code" placeholder="請輸入折扣百分比" v-model="tempCoupon.percent">
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="due_date" class="form-label">到期日</label>
                        <input type="date" class="form-control" id="due_date" placeholder="請輸入到期日" v-model="timestamp">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="code" class="form-label">優惠碼</label>
                        <input type="text" class="form-control" id="code" placeholder="請輸入優惠碼" v-model="tempCoupon.code">
                    </div>

                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" :true-value="1" :false-value="0" id="is_enabled"
                                v-model="tempCoupon.is_enabled">
                            <label class="form-check-label" for="is_enabled">
                                是否啟用
                            </label>
                        </div>
                    </div>

                    <div class="col mb-5 text-center">
                        <button type="button" class="normalBtn me-5" data-bs-dismiss="modal" style="background-color: #828282;">取消
                        </button>
                        <button type="button" class="normalBtn blueBtn"
                            @click="$emit('update-coupon', tempCoupon)">確認</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
    props: {
        // 由外層tempProduct傳進來
        coupon: {},
    },
    watch: {
        coupon() {
            this.tempCoupon = this.coupon;
        },
        // 轉換格式
        timestamp: function (newDate) {
            if (newDate) {
                this.tempCoupon.due_date = new Date(newDate).getTime() / 1000
                console.log(this.tempCoupon.due_date);
            } else {
                this.timestamp = null
            }
        },
    },
    data() {
        return {
            due_date: null,
            timestamp: null,
            tempCoupon: {},
        }
    },
    mixins: [modalMixin],
}
</script>