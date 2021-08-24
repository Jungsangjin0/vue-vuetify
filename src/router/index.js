import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Board from '@/views/Board.vue'
import store from '@/store/store.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/board',
      name: 'board',
      component: Board,
      beforeEnter: (to, from, next) => {
        const isLogin = store.state.loginStatus
        if (!isLogin) {
          // next({name: 'login'})
          next()
        } else {
          next()
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/detail/:postsId',
      name: 'detail',
      component: () => import('../views/Detail.vue')
    }
  ]
})
