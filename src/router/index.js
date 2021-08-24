import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Posts from '@/views/Posts.vue'
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
      path: '/posts',
      name: 'posts',
      component: Posts,
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
      path: '/posts/:postsId',
      name: 'detail',
      component: () => import('../views/Detail.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/components/FileList.vue')
    }
  ]
})
