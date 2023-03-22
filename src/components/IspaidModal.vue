<template>
    <div class="modal fade" tabindex="-1" aria-hidden="true" ref="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">付款成功</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <img src="../assets/image/mdi_credit-card-check-outline.png" alt="">
                    <p>您已付款完成！</p>
                    <button type="button" class="normalBtn" data-bs-dismiss="modal">關閉</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
    data() {
        return {
            modal: {},
        }
    },
    mixins: [modalMixin],
}

</script>