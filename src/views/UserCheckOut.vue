<template>
    <div class="my-5 row justify-content-center">
        <form class="col-md-6">
            <table class="table align-middle">
                <thead>
                    <th>品名</th>
                    <th>數量</th>
                    <th>單價</th>
                </thead>
                <tbody>
                    <tr>
                        <td>產品</td>
                        <td>1 / 個</td>
                        <td class="text-end">100</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2" class="text-end">總計</td>
                        <td class="text-end">100</td>
                    </tr>
                </tfoot>
            </table>

            <table class="table">
                <tbody>
                    <tr>
                        <th width="100">Email</th>
                        <td>abc@gmail.com</td>
                    </tr>
                    <tr>
                        <th>姓名</th>
                        <td>AA</td>
                    </tr>
                    <tr>
                        <th>收件人電話</th>
                        <td>0987654321</td>
                    </tr>
                    <tr>
                        <th>收件人地址</th>
                        <td>Address</td>
                    </tr>
                    <tr>
                        <th>付款狀態</th>
                        <td>
                            <span>尚未付款</span>
                            <span class="text-success">付款完成</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="text-end">
                <button class="btn btn-danger">確認付款去</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            order: {
                user:{},
            },
            orderID: '',
            isLoading: false,
        }
    },
    methods: {
        getOrders() {

        },

    },
    created() {
        this.orderID = this.$route.params.orderID;
        console.log(this.orderID);
    },
}
</script>