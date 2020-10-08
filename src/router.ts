import Vue from 'vue';
import Router, { NavigationGuard } from 'vue-router';

import Login from './views/Login.vue';
import UserRegistry from './views/UserRegistry.vue';
import EventRegistry from './views/EventRegistry.vue';
import EventPage from './views/EventPage.vue';
import SelectEvent from './views/SelectEvent.vue';
import Error from './views/Error.vue';
import LoginFailed from './views/LoginFailed.vue';
import Logout from './views/Logout.vue';
import TokenManager from '@/auth/TokenManager';
import Message from '@/common/const/Message';
import Auth from './auth/Auth';

Vue.use(Router);

const nvg: NavigationGuard<Vue> = ( (to, from, next) => {
  if (TokenManager.isTokenValid()) {
    next();
  } else {
    alert(Message.I0001('この操作'));
    next({ path: '/login'});
  }
});

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,

  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        title: 'hoge',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/Logout',
      name: 'Logout',
      component: Logout,
    },
    {
      path: '/UserRegistry',
      name: 'UserRegistry',
      component: UserRegistry,
    },
    {
      path: '/EventRegistry',
      name: 'EventRegistry',
      component: EventRegistry,
      beforeEnter: nvg,
    },
    {
      path: '/EventPage/:value',
      name: 'EventPage',
      component: EventPage,
      beforeEnter: nvg,
    },
    {
      path: '/SelectEvent',
      name: 'SelectEvent',
      component: SelectEvent,
      beforeEnter: nvg,
    },
    {
      path: '/Error',
      name: 'Error',
      component: Error,
    },
    {
      path: '/LoginFailed',
      name: 'LoginFailed',
      component: LoginFailed,
    },
    {
      path: '*',
      redirect: '/Error',
    },
  ],
});
