import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Products.vue'),
      },
      {
        path: 'order',
        component: () => import('../views/Order.vue'),
      },
      {
        path: 'coupon',
        component: () => import('../views/Coupon.vue'),
      },
      {
        path: 'favorite',
        component: () => import('../views/FavoriteList.vue'),
      },
    ],
  },
  {
    path: '/user',
    component: () => import('../views/Userboard.vue'),
    children: [
      {
        path: 'AllProduct/:pageName',
        name: 'AllProduct',
        component: () => import('../views/AllProduct.vue'),
        props: true,
      },
      {
        path: 'cart',
        component: () => import('../views/UserCart.vue'),
      },
      {
        path: 'product/:productId',
        component: () => import('../views/UserProduct.vue'),
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/UserCheckOut.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})



export default router
