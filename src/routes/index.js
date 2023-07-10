import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [

  /* needs to be configured */
  // {
  //   path: '/',
  //   name: 'home',
  //   meta: { requiresAuth: true },
  //   meta:{
  //     isAuth: true
  //   },
  //   component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard/Main.vue'),
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/auth/Login.vue'),
    meta:{
      isAuth: false
    }
  },
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: () => import(/* webpackChunkName: "register" */ '../views/auth/Register.vue'),
  //   meta:{
  //     isAuth: false
  //   }
  // },

   {
    path: '/',
    name: 'home',
    meta: { requiresAuth: true },
    meta:{
      isAuth: true
    },
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/auth/Login.vue'),
  },

]

const router = createRouter({
  history: createWebHashHistory('https://app.canchas.club/'),
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.matched.some(record => record.meta.isAuth)){
      const userId = localStorage.getItem('userId')
      const token = localStorage.getItem('token')
      
      if(!userId || !token){
          next('/login')
      }
  }
  next()
})

export default router
