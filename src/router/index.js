import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/Index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Index
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/LoginView.vue' )
  },
  {
    path: '/dashboard',
    component: () => import( '../views/DashBoard.vue' ),
    children: [
      {
        path: 'products',
        component: () => import( '../views/Products.vue' ),
      },
      {
        path: 'order',
        component: () => import( '../views/Order.vue' ),
      },
      {
        path: 'coupon',
        component: () => import( '../views/Coupon.vue' ),
      },
    ],
  },
  {
    path: '/user',
    component: () => import( '../views/Userboard.vue' ),
    children: [
      {
        path: 'cart',
        component: () => import( '../views/UserCart.vue' ),
      },
      {
        path: 'product/:productId',
        component: () => import( '../views/UserProduct.vue' ),
      },
      {
        path: 'checkout/:orderId',
        component: () => import( '../views/UserCheckOut.vue' ),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
