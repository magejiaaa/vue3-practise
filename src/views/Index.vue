<template>
  <UserNavbar></UserNavbar>
  <div class="container-fluid">
    <div class="row | banner"></div>
    <div class="row | bannerShadow"></div>
    <p class="bannerText">
      想要那個酷酷的坐騎，但為了抽房身上沒有Gil可以購買？<br>
      又或是想要的寵物無法交易，寵物欄就缺這個看了很心酸？<br>
      菜市場提供一個玩家交易平台，讓不可能化為可能。
    </p>
    <!-- scroll -->
    <div class="scrollArrow">
      <span>Scroll</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="74" viewBox="0 0 14 74" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M13.6863 1C13.6863 0.447715 13.2386 0 12.6863 0C12.134 0 11.6863 0.447715 11.6863 1L11.6863 69.1438L2.5145 53.8575C2.23036 53.3839 1.6161 53.2303 1.14252 53.5145C0.668935 53.7986 0.515371 54.4129 0.799518 54.8865L11.7705 73.1715C12.0547 73.6451 12.6689 73.7986 13.1425 73.5145C13.53 73.282 13.7032 72.8285 13.5978 72.4119C13.6546 72.2863 13.6863 72.1469 13.6863 72L13.6863 1Z"
          fill="white" />
      </svg>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import UserNavbar from "../components/UserNavbar.vue";

export default {
  name: 'Index',
  components: {
    UserNavbar,
  },
}
</script>
