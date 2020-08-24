import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', // 默认页面重定向到主页
      redirect: '/HelloWorld'
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      meta: {
        keepAlive: false
      },
      component: () => import('@/components/HelloWorld'),
      children: [
        {
          path: '/OnePage',
          name: 'OnePage',
          component: () => import('@/components/OnePage/OnePage')
        }, {
          path: '/SecondPage',
          name: 'SecondPage',
          component: () => import('@/components/SecondPage/SecondPage')
        }, {
          path: '/SearchSong',
          name: 'SearchSong',
          meta: {
            keepAlive: true
          },
          component: () => import('@/components/SearchSong/SearchSong')
        }, {
          path: '/SongDetail',
          name: 'SongDetail',
          meta: {
            keepAlive: false
          },
          component: () => import('@/components/SongDetail/SongDetail')
        }
      ]
    },
    {
      path: '*',
      component: () => import('@/components/Error/Error')
    }
  ]
})
