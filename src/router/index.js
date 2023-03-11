import { createRouter, createWebHashHistory } from 'vue-router'
// import { mapActions } from 'pinia';
// import cartStore from '@/stores/cartStore';


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
    ],
  },
  {
    path: '/user',
    component: () => import('../views/Userboard.vue'),
    children: [
      {
        path: 'petProduct',
        component: () => import('../views/petProduct.vue'),
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

// router.beforeEach((to, from, next) => {
//   const actions = mapActions(cartStore, ['getCart']);
//   actions.getCart()
//     .then(() => {
//       next();
//     })
//     .catch(() => {
//       next(false);
//     });
// });


export default router
