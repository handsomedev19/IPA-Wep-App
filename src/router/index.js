/**
* Author:       Rayan Henchiri
* File name:    index.js
* Version:      1.0
* Date:         2021
* Description:  The connections between the different components are defined here.
*/

// Imports Vue from a library 
import Vue from 'vue'
// Imports Router from a library 
import Router from 'vue-router'
// Imports Login from a C:\IPA_Webapp\Client\src\components\Login.vue 
import Login from '../components/Login.vue'
// Imports Ereignisprotokoll from C:\IPA_Webapp\Client\src\components\Ereignisprotokoll.vue
import Ereignisprotokoll from '../components/Ereignisprotokoll.vue'
// Imports Lehreransicht from C:\IPA_Webapp\Client\src\components\Lehreransicht.vue
import Lehreransicht from '../components/Lehreransicht.vue'
// Imports Info from C:\IPA_Webapp\Client\src\components\Info.vue
import Info from '../components/Info.vue'
// Imports Ereignishinzufügen from C:\IPA_Webapp\Client\src\components\Ereignishinzufügen.vue
import Ereignishinzufügen from '../components/Ereignishinzufügen.vue'
// Imports store from C:\IPA_Webapp\Client\src\store.js
import store from '@/store'

Vue.use(Router)

// The URLs are defined here.
export const router = new Router({
  // I needed to change the mode: to 'history' to use the url without '#
  mode: 'history',
  base: process.env.BASE_URL,
  props: true,
  routes: [{
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/ereignisprotokoll',
      name: 'ereignisprotokoll',
      component: Ereignisprotokoll
    },
    {
      path: '/lehreransicht',
      name: 'lehreransicht',
      component: Lehreransicht
    },
    {
      path: '/Ereignishinzufügen',
      name: 'Ereignishinzufügen',
      component: Ereignishinzufügen
    },
    {
      path: '/',
      name: 'info',
      component: Info
    },
    {
      path: '*',
      name: 'all',
      component: Login
    },
  ]
})

// Defines the access for the page '/ereignisprotokoll' and the page '/leheransicht'
router.beforeEach((to, from, next) => {
  const adminPage = ['/ereignisprotokoll']
  const authRequired = adminPage.includes(to.path);

  const admin = store.state.admin

  if (authRequired && admin) {
    return next('/lehreransicht')
  }

  next();
})

