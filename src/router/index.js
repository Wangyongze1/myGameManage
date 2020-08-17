import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import OnePage from '@/components/OnePage/OnePage'
import SecondPage from '@/components/SecondPage/SecondPage'
import Error from '@/components/Error/Error'
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
      component: HelloWorld,
      children: [
        {
          path: '/OnePage',
          name: 'OnePage',
          component: OnePage
        },
        {
          path: '/SecondPage',
          name: 'SecondPage',
          component: SecondPage
        }
      ]
    },
    {
      path: '*',
      component: Error
    }
  ]
})
