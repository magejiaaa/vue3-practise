<template>
  <UserNavbar></UserNavbar>
  <div class="container-fluid">
    <div class="row">
      <div class="banner"></div>
      <div class="bannerShadow"></div>
      <div class="bannerBox">
        <h2 class="bannerText" ref="bannerText">
          想要那個酷酷的坐騎，但為了抽房身上沒有Gil可以購買？<br>
          又或是想要的寵物無法交易，寵物欄就缺這個看了很心酸？<br>
          菜市場提供一個玩家交易平台，讓不可能化為可能。
        </h2>
      </div>
      <!-- scroll -->
      <div class="scrollArrow">
        <span ref="scrollText">Scroll</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="74" viewBox="0 0 14 74" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M13.6863 1C13.6863 0.447715 13.2386 0 12.6863 0C12.134 0 11.6863 0.447715 11.6863 1L11.6863 69.1438L2.5145 53.8575C2.23036 53.3839 1.6161 53.2303 1.14252 53.5145C0.668935 53.7986 0.515371 54.4129 0.799518 54.8865L11.7705 73.1715C12.0547 73.6451 12.6689 73.7986 13.1425 73.5145C13.53 73.282 13.7032 72.8285 13.5978 72.4119C13.6546 72.2863 13.6863 72.1469 13.6863 72L13.6863 1Z"
            fill="white" />
        </svg>
      </div>

      <!-- 販售種類 -->
      <div class="saleItem">
        <div class="d-flex justify-content-center mb-5">
          <!-- <img :src="itemImg" alt="販售種類"> -->
          <h5 class="indexTitle">販售種類</h5>
        </div>
        <ul class="d-flex justify-content-around mb-0 mb-md-5 flex-wrap" ref="ItemBox">
          <li class="saleItemList">
            <router-link to="/dashboard/products" class="active" aria-current="page">
              <img :src="petImg" alt="寵物販售">
              <p>寵物販售</p>
            </router-link>
          </li>
          <li class="saleItemList">
            <router-link to="/dashboard/products" class="active" aria-current="page">
              <img :src="mountImg" alt="坐騎販售">
              <p>坐騎販售</p>
            </router-link>
          </li>
          <li class="saleItemList">
            <router-link to="/dashboard/products" class="active" aria-current="page">
              <img :src="boosterImg" alt="代打代練">
              <p>代打代練</p>
            </router-link>
          </li>
          <li class="saleItemList">
            <router-link to="/dashboard/products" class="active" aria-current="page">
              <img :src="GilImg" alt="購買Gil">
              <p>購買Gil</p>
            </router-link>
          </li>
        </ul>
        <button class="btn_more">
          <span class="align-middle">查看所有商品</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M5.70001 6.70998C5.6073 6.80249 5.53375 6.91238 5.48357 7.03336C5.43339 7.15433 5.40756 7.28401 5.40756 7.41498C5.40756 7.54595 5.43339 7.67563 5.48357 7.7966C5.53375 7.91758 5.6073 8.02747 5.70001 8.11998L9.58001 12L5.70001 15.88C5.60742 15.9726 5.53398 16.0825 5.48388 16.2034C5.43377 16.3244 5.40799 16.454 5.40799 16.585C5.40799 16.7159 5.43377 16.8456 5.48388 16.9665C5.53398 17.0875 5.60742 17.1974 5.70001 17.29C5.79259 17.3826 5.9025 17.456 6.02346 17.5061C6.14443 17.5562 6.27408 17.582 6.40501 17.582C6.53594 17.582 6.66559 17.5562 6.78655 17.5061C6.90751 17.456 7.01742 17.3826 7.11001 17.29L11.7 12.7C11.7927 12.6075 11.8663 12.4976 11.9164 12.3766C11.9666 12.2556 11.9925 12.1259 11.9925 11.995C11.9925 11.864 11.9666 11.7343 11.9164 11.6134C11.8663 11.4924 11.7927 11.3825 11.7 11.29L7.12001 6.70998C6.73001 6.31998 6.09001 6.31998 5.70001 6.70998Z"
              fill="currentColor" />
            <path
              d="M12.29 6.71002C12.1973 6.80254 12.1238 6.91242 12.0736 7.0334C12.0234 7.15437 11.9976 7.28405 11.9976 7.41502C11.9976 7.54599 12.0234 7.67567 12.0736 7.79665C12.1238 7.91762 12.1973 8.02751 12.29 8.12002L16.17 12L12.29 15.88C12.103 16.067 11.998 16.3206 11.998 16.585C11.998 16.8494 12.103 17.103 12.29 17.29C12.477 17.477 12.7306 17.582 12.995 17.582C13.2594 17.582 13.513 17.477 13.7 17.29L18.29 12.7C18.3827 12.6075 18.4563 12.4976 18.5064 12.3766C18.5566 12.2557 18.5824 12.126 18.5824 11.995C18.5824 11.8641 18.5566 11.7344 18.5064 11.6134C18.4563 11.4924 18.3827 11.3825 18.29 11.29L13.7 6.70002C13.32 6.32002 12.68 6.32002 12.29 6.71002Z"
              fill="currentColor" />
          </svg>
        </button>
      </div>

      <!-- 網站特色 -->
      <div class="d-flex text-center justify-content-center align-items-start | feature">
        <div class="FeatureTitle">
          <h5>網站特色</h5>
          <img :src="FeatureImg" alt="網站特色的尊嚴王" ref="Feature">
        </div>
        <div class="FeatureGroup" ref="FeatureGroup">
          <div class="card | FeatureList" ref="FeatureList1">
            <div class="card-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
                <path
                  d="M35.9333 19.6667L38.8333 22.5667L22.4 39L19.5 36.1L35.9333 19.6667ZM9.83333 10H48.5C51.1825 10 53.3333 12.1508 53.3333 14.8333V24.5C52.0514 24.5 50.8221 25.0092 49.9156 25.9157C49.0092 26.8221 48.5 28.0515 48.5 29.3333C48.5 30.6152 49.0092 31.8446 49.9156 32.751C50.8221 33.6574 52.0514 34.1667 53.3333 34.1667V43.8333C53.3333 46.5158 51.1825 48.6667 48.5 48.6667H9.83333C8.55145 48.6667 7.32208 48.1574 6.41565 47.251C5.50922 46.3446 5 45.1152 5 43.8333V34.1667C7.6825 34.1667 9.83333 32.0158 9.83333 29.3333C9.83333 28.0515 9.32411 26.8221 8.41768 25.9157C7.51126 25.0092 6.28188 24.5 5 24.5V14.8333C5 13.5515 5.50922 12.3221 6.41565 11.4157C7.32208 10.5092 8.55145 10 9.83333 10ZM9.83333 14.8333V20.9717C11.3019 21.8185 12.5215 23.0371 13.3695 24.505C14.2175 25.9728 14.664 27.6381 14.664 29.3333C14.664 31.0285 14.2175 32.6938 13.3695 34.1617C12.5215 35.6296 11.3019 36.8482 9.83333 37.695V43.8333H48.5V37.695C47.0314 36.8482 45.8118 35.6296 44.9638 34.1617C44.1158 32.6938 43.6693 31.0285 43.6693 29.3333C43.6693 27.6381 44.1158 25.9728 44.9638 24.505C45.8118 23.0371 47.0314 21.8185 48.5 20.9717V14.8333H9.83333ZM23.125 19.6667C25.1308 19.6667 26.75 21.2858 26.75 23.2917C26.75 25.2975 25.1308 26.9167 23.125 26.9167C21.1192 26.9167 19.5 25.2975 19.5 23.2917C19.5 21.2858 21.1192 19.6667 23.125 19.6667ZM35.2083 31.75C37.2142 31.75 38.8333 33.3692 38.8333 35.375C38.8333 37.3808 37.2142 39 35.2083 39C33.2025 39 31.5833 37.3808 31.5833 35.375C31.5833 33.3692 33.2025 31.75 35.2083 31.75Z"
                  fill="#9747FF" />
              </svg>
              <h6>優惠券功能</h6>
            </div>
            <p class="card-body">打破傳統需要開專屬賣場的功能，讓各種組合自動顯示優惠，省下溝通的時間。</p>
          </div>
          <div class="card | FeatureList" ref="FeatureList2">
            <div class="card-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
                <path
                  d="M19.3333 41.0833C20.0181 41.0833 20.5924 40.8513 21.0564 40.3873C21.5204 39.9233 21.7516 39.3498 21.75 38.6667C21.75 37.9819 21.518 37.4076 21.054 36.9436C20.59 36.4796 20.0164 36.2484 19.3333 36.25C18.6486 36.25 18.0743 36.482 17.6103 36.946C17.1463 37.41 16.9151 37.9836 16.9167 38.6667C16.9167 39.3514 17.1487 39.9257 17.6127 40.3897C18.0767 40.8537 18.6502 41.0849 19.3333 41.0833ZM19.3333 31.4167C20.0181 31.4167 20.5924 31.1847 21.0564 30.7207C21.5204 30.2567 21.7516 29.6831 21.75 29C21.75 28.3153 21.518 27.7409 21.054 27.2769C20.59 26.8129 20.0164 26.5817 19.3333 26.5833C18.6486 26.5833 18.0743 26.8153 17.6103 27.2793C17.1463 27.7433 16.9151 28.3169 16.9167 29C16.9167 29.6847 17.1487 30.2591 17.6127 30.7231C18.0767 31.1871 18.6502 31.4183 19.3333 31.4167ZM19.3333 21.75C20.0181 21.75 20.5924 21.518 21.0564 21.054C21.5204 20.59 21.7516 20.0164 21.75 19.3333C21.75 18.6486 21.518 18.0742 21.054 17.6102C20.59 17.1462 20.0164 16.9151 19.3333 16.9167C18.6486 16.9167 18.0743 17.1487 17.6103 17.6127C17.1463 18.0767 16.9151 18.6502 16.9167 19.3333C16.9167 20.0181 17.1487 20.5924 17.6127 21.0564C18.0767 21.5204 18.6502 21.7516 19.3333 21.75ZM26.5833 41.0833H41.0833V36.25H26.5833V41.0833ZM26.5833 31.4167H41.0833V26.5833H26.5833V31.4167ZM26.5833 21.75H41.0833V16.9167H26.5833V21.75ZM12.0833 50.75C10.7542 50.75 9.61592 50.2763 8.66859 49.329C7.72125 48.3817 7.24839 47.2442 7.25 45.9167V12.0833C7.25 10.7542 7.72367 9.61591 8.671 8.66858C9.61834 7.72125 10.7558 7.24839 12.0833 7.25H45.9167C47.2458 7.25 48.3841 7.72366 49.3314 8.671C50.2788 9.61833 50.7516 10.7558 50.75 12.0833V45.9167C50.75 47.2458 50.2763 48.3841 49.329 49.3314C48.3817 50.2787 47.2442 50.7516 45.9167 50.75H12.0833ZM12.0833 45.9167H45.9167V12.0833H12.0833V45.9167Z"
                  fill="#9747FF" />
              </svg>
              <h6>產品列表管理</h6>
            </div>
            <p class="card-body">清楚的產品內容讓您一目了然，還支援標籤功能，不管是什麼類型的產品都能做好分類與篩選。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import UserNavbar from "../components/UserNavbar.vue";
import Footer from '../components/footer.vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'Index',
  components: {
    UserNavbar,
    Footer,
  },
  setup() {
    const petImg = require('../assets/image/map_pet-store.png')
    const itemImg = require('../assets/image/item_icon.png')
    const mountImg = require('../assets/image/mdi_horse-human.png')
    const boosterImg = require('../assets/image/ri_sword-fill.png')
    const GilImg = require('../assets/image/bi_coin.png')
    const FeatureImg = require('../assets/image/FeatureImg.png')


    const scrollText = ref(null)
    // 販售種類
    const ItemBox = ref(null)
    const mediaQuery = "(max-width: 820px)";
    const isSmallScreen = gsap.matchMedia(mediaQuery).matches;
    const bannerText = ref(null)
    // 網站特色
    const Feature = ref(null)
    const FeatureList1 = ref(null)
    const FeatureList2 = ref(null)
    const FeatureGroup = ref(null)


    onMounted(() => {
      gsap.from(bannerText.value, {
        x: '-500px',
        opacity: 0,
        duration: 1,
      })

      gsap.to(scrollText.value, {
        y: '13px',
        duration: 0.8,
        repeat: -1,
        yoyo: true,
      });

      const boxes = gsap.utils.toArray(ItemBox.value.querySelectorAll('li'));
      gsap.to(boxes, {
        opacity: 1,
        y: '0px',
        stagger: 0.2,
        duration: 0.7,
        scrollTrigger: {
          trigger: ItemBox.value,
          start: isSmallScreen ? "top 100%" : "top 80%",
          end: isSmallScreen ? "bottom bottom" : "top 50%",
          scrub: true,
          markers: false,
          animation: gsap.from(boxes, {
            opacity: 0,
            y: '50px',
            duration: 0.5,
          }),
        },
      });

      gsap.from(Feature.value, {
        opacity: 0,
        x: '-200px',
        y: '-50px',
        scrollTrigger: {
          trigger: Feature.value,
          start: "top 90%",
          end: "top 30%",
          scrub: true,
          markers: false,
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: FeatureGroup.value,
          start: "top 90%",
          end: "top 30%",
          scrub: true,
          markers: false,
        }
      });

      tl.fromTo(FeatureList1.value, 
        {
          x: '200px',
          opacity: 0,
        },
        {
          x: '0px',
          opacity: 1,
          duration: 0.7,
        }
      )
        .from(FeatureList2.value, {
          x: '200px',
          opacity: 0,
          duration: 0.7
        });

    });

    onUnmounted(() => {
      gsap.scrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    });

    return {
      petImg,
      itemImg,
      mountImg,
      boosterImg,
      GilImg,
      FeatureImg,

      scrollText,
      ItemBox,
      bannerText,
      Feature,
      FeatureGroup,
      FeatureList1,
      FeatureList2

    }
  },
}
</script>
