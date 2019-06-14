/**
 * 路由设置
 */

import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import store from '@/store';
import permission from '@/utils/permission';
import menu from '@/resources/menu';

Vue.use(Router);

const routes = [
  {
    name: 'home.index',
    path: '/',
    meta: {
      title: '首页',
    },
    component: () => import('@/views/home/index'),
  },
  ...menu,
  {
    path: '*',
    meta: {
      title: '404',
    },
    component: () => import('@/views/404'),
  },
];

const router = new Router({
  mode: 'history', // 路由模式
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,
});

// 路由跳转前进行身份认证

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
