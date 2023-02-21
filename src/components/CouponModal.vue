<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
        ref="modal">
        <!-- 請同學自行新增 v-model -->
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                        <span>新增優惠券</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="title">標題</label>
                        <input type="text" class="form-control" id="title" v-model="tempCoupon.title" placeholder="請輸入標題">
                    </div>
                    <div class="mb-3">
                        <label for="coupon_code">優惠碼</label>
                        <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code"
                            placeholder="請輸入優惠碼">
                    </div>
                    <div class="mb-3">
                        <label for="due_date">到期日</label>
                        <input type="date" class="form-control" id="due_date" v-model="timestamp">
                    </div>
                    <div class="mb-3">
                        <label for="price">折扣百分比</label>
                        <input type="number" class="form-control" id="price" v-model.number="tempCoupon.percent"
                            placeholder="請輸入折扣百分比">
                    </div>
                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" :true-value="1" :false-value="0"
                                v-model="tempCoupon.is_enabled" id="is_enabled">
                            <label class="form-check-label" for="is_enabled">
                                是否啟用
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消
                    </button>
                    <button type="button" class="btn btn-primary" @click="$emit('update-coupon', tempCoupon)">確認</button>
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