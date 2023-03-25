<template>
    <div class="modal fade" id="orderModal" tabindex="-1" role="dialog" aria-labelledby="orderModalLabel" aria-hidden="true"
        ref="modal">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content border-0 | productModel orderModel">
                <div class="text-end">
                    <button type="button" class="btn-close | modelClose" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="row">
                    <div class="col-lg-4 | orderUserBox">
                        <h3>用戶資料</h3>
                        <table class="table">
                            <!-- 當tempOrder.user傳資料後再顯示 -->
                            <tbody v-if="tempOrder.user">
                                <tr>
                                    <th style="width: 100px;">姓名</th>
                                    <td>{{ tempOrder.user.name }}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{{ tempOrder.user.email }}</td>
                                </tr>
                                <tr>
                                    <th>電話</th>
                                    <td>{{ tempOrder.user.tel }}</td>
                                </tr>
                                <tr>
                                    <th>地址</th>
                                    <td>{{ tempOrder.user.address }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-lg-8" style="padding: 40px 3.5%;">
                        <h3>訂單細節</h3>
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th style="width: 100px">訂單編號</th>
                                    <td>{{ tempOrder.num }}</td>
                                </tr>
                                <tr>
                                    <th>下單時間</th>
                                    <td>{{ $filters.date(tempOrder.create_at) }}</td>
                                </tr>
                                <tr>
                                    <th>付款時間</th>
                                    <td>
                                        <span v-if="tempOrder.paid_date">
                                            {{ $filters.date(tempOrder.paid_date) }}
                                        </span>
                                        <span v-else>時間不正確</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>付款狀態</th>
                                    <td>
                                        <strong class="text-success" v-if="tempOrder.is_paid">已付款</strong>
                                        <span v-else class="text-muted">尚未付款</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>總金額</th>
                                    <td>
                                        {{ tempOrder.total }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h3>選購商品</h3>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>
                                        品項
                                    </th>
                                    <th>
                                        單價/數量
                                    </th>
                                    <th class="text-end">
                                        總價
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in tempOrder.products" :key="item.id">
                                    <th>
                                        {{ item.product.title }}
                                    </th>
                                    <td>
                                        {{ item.product.price }}元/{{ item.qty }}{{ item.product.unit }}
                                    </td>
                                    <td class="text-end">
                                        {{ item.product.price * item.qty }}元
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="mb-5 text-center">
                    <button type="button" class="normalBtn me-5" data-bs-dismiss="modal"
                    style="background-color: #828282;">取消
                    </button>
                    <button type="button" class="normalBtn blueBtn" @click="$emit('update-order', tempOrder)">已付款</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
    props: {
        // 由外層tempOrder傳進來
        orderOutside: {
            type: Object,
            default() { return {}; },
        },
    },
    watch: {
        orderOutside() {
            this.tempOrder = this.orderOutside;
            // 監聽是否付款
            this.isPaid = this.tempOrder.is_paid;
        },
    },
    data() {
        return {
            modal: {},
            tempOrder: {},
        }
    },
    mixins: [modalMixin],
}
</script>