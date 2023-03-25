<template>
    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true" ref="modal">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content border-0 | productModel">
                <div class="text-end">
                    <button type="button" class="btn-close | modelClose" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <h3>編輯產品</h3>
                <!-- 產品圖片 -->
                <div class="row">
                    <div class="col-md-6 text-center">
                        <swiper-container navigation="true" pagination="true" init="false">
                            <swiper-slide v-for="(image, key) in product.imagesUrl" :key="key">
                                <img :src="image" alt="" class="img-fluid mb-3">
                            </swiper-slide>
                        </swiper-container>
                    </div>
                    <div class="col-sm-6">
                        <label for="customFile" class="form-label">上傳圖片</label>
                        <input type="file" id="customFile" class="form-control mb-3" ref="fileInput" @change="uploadFile">
                        <img class="img-fluid" alt="" :src="tempProduct.imageUrl">
                        <!-- 多圖 -->
                        <div v-if="tempProduct.imagesUrl">
                            <label for="customFile" class="form-label">已上傳</label>
                            <div v-for="(image, key) in tempProduct.images" class="mb-3 d-flex" :key="key">
                                <div class="tempPic" :style="{ backgroundImage: `url(${image})` }">
                                </div>
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="請輸入連結" :value="image">
                                    <button type="button" class="btn btn-outline-danger"
                                        @click="tempProduct.imagesUrl.splice(key, 1)">
                                        移除圖片
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3 input-group">
                            <input type="text" class="form-control" id="image" placeholder="插入圖片連結"
                                v-model="tempProduct.imageUrl">
                            <button type="button" class="btn blue-outline" @click="addImage(tempProduct.imageUrl)">
                                新增圖片
                            </button>
                        </div>
                    </div>
                </div>
                <!-- 產品敘述 -->
                <div class="col">
                    <div class="mb-3">
                        <label for="title" class="form-label">產品名稱</label>
                        <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempProduct.title">
                    </div>

                    <div class="row gx-2">
                        <div class="mb-3 col-md-3 | selectInput">
                            <i class="bi bi-caret-down-fill"></i>
                            <label for="category" class="form-label">分類</label>
                            <select name="category" id="category" class="form-control" v-model="tempProduct.category">
                                <option value="" disabled>請選擇分類</option>
                                <option value="寵物">寵物</option>
                                <option value="坐騎">坐騎</option>
                                <option value="代打代練">代打代練</option>
                                <option value="Gil">Gil</option>
                            </select>
                        </div>
                        <div class="mb-3 col-md-3">
                            <label for="price" class="form-label">單位</label>
                            <input type="text" class="form-control" id="unit" placeholder="請輸入單位"
                                v-model="tempProduct.unit">
                        </div>
                        <div class="mb-3 col-md-3">
                            <label for="origin_price" class="form-label">原價</label>
                            <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價"
                                v-model="tempProduct.origin_price">
                        </div>
                        <div class="mb-3 col-md-3">
                            <label for="price" class="form-label">售價</label>
                            <input type="number" class="form-control" id="price" placeholder="請輸入售價"
                                v-model="tempProduct.price">
                        </div>
                    </div>

                    <div class="row gx-2 mb-3">
                        <div class="col-md-6">
                            <label for="description" class="form-label">產品描述</label>
                            <textarea type="text" class="form-control" id="description" placeholder="請輸入產品描述"
                                v-model="tempProduct.description"></textarea>
                        </div>
                        <div class="col-md-6">
                            <label for="content" class="form-label">說明內容</label>
                            <textarea type="text" class="form-control" id="content" placeholder="請輸入產品說明內容"
                                v-model="tempProduct.content"></textarea>
                        </div>
                    </div>

                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" :true-value="1" :false-value="0" id="is_enabled"
                                v-model="tempProduct.is_enabled">
                            <label class="form-check-label" for="is_enabled">
                                是否啟用
                            </label>
                        </div>
                    </div>

                    <div class="mb-5 text-center">
                        <button type="button" class="normalBtn me-5" data-bs-dismiss="modal" style="background-color: #828282;">取消
                        </button>
                        <button type="button" class="normalBtn blueBtn"
                            @click="$emit('update-product', tempProduct)">確認</button>
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
        product: {
            type: Object,
            default() { return {}; },
        },
    },
    watch: {
        product() {
            this.tempProduct = this.product;
            // 多圖範例
            if (!this.tempProduct.images) {
                this.tempProduct.images = []
            }
        },
    },
    data() {
        return {
            modal: {},
            tempProduct: {},
        }
    },
    methods: {
        uploadFile() {
            // 上傳圖片
            //取得上傳的陣列中的第0個檔案
            const uploadedFile = this.$refs.fileInput.files[0];
            // 轉成formData格式
            const formData = new FormData();
            // 增加一個欄位至form裡面
            formData.append('file-to-upload', uploadedFile);
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
            this.$http.post(url, formData)
                .then((response) => {
                    console.log(response.data);
                    if (response.data.success) {
                        this.tempProduct.imageUrl = response.data.imageUrl;
                    }
                });
        },
        addImage(img) {
            this.tempProduct.images.push(img);
            this.tempProduct.imageUrl = '';
            this.tempProduct.imagesUrl = this.tempProduct.images;
        },
        changeSwiperStyle() {
            const swiperEl = document.querySelector('swiper-container');

            const params = {
                // array with CSS styles
                injectStyles: [
                    `
                    .swiper-horizontal {
                        padding-bottom: 20px;
                        text-align: center;
                    }
                    .swiper-button-next, .swiper-button-prev {
                        opacity: 0;
                        transition: all 0.3s ease;
                        padding: 0 15px;
                    }
                    .swiper-button-next:hover, .swiper-button-prev:hover {
                        opacity: 100%;
                    }
                    .swiper-button-next.swiper-button-disabled,
                    .swiper-button-prev.swiper-button-disabled {
                        opacity: 0;
                        cursor: pointer;
                    }
                    .swiper-button-next.swiper-button-disabled:hover,
                    .swiper-button-prev.swiper-button-disabled:hover {
                        opacity: .35;
                    }
                    `,
                ],
            };
            Object.assign(swiperEl, params);
            swiperEl.initialize();
        },
    },
    mixins: [modalMixin],
    mounted() {
        this.changeSwiperStyle();
    },
}
</script>