import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserView.vue')
    },
    {
      path: '/useradd',
      name: 'useradd',
      component: () => import('../views/UserAddView.vue')
    },
    {
      path: '/userupdate',
      name: 'userupdate',
      component: () => import('../views/UserUpdateView.vue')
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: () => import('../views/ScheduleView.vue')
    },
    {
      path: '/scheduleadd',
      name: 'scheduleadd',
      component: () => import('../views/ScheduleAddView.vue')
    },
    {
      path: '/scheduleupdate',
      name: 'scheduleupdate',
      component: () => import('../views/ScheduleUpdateView.vue')
    },
    {
      path: '/sign',
      name: 'sign',
      component: () => import('../views/SignView.vue')
    },
    {
      path: '/signadd',
      name: 'signadd',
      component: () => import('../views/SignAddView.vue')
    },
    {
      path: '/leave',
      name: 'leave',
      component: () => import('../views/LeaveView.vue')
    },
    {
      path: '/leaveadd',
      name: 'leaveadd',
      component: () => import('../views/LeaveAddView.vue')
    },
    {
      path: '/leaveupdate',
      name: 'leaveupdate',
      component: () => import('../views/LeaveUpdateView.vue')
    },
    {
      path: '/overtime',
      name: 'overtime',
      component: () => import('../views/OvertimeView.vue')
    },
    {
      path: '/overtimeadd',
      name: 'overtimeadd',
      component: () => import('../views/OvertimeAddView.vue')
    },
    {
      path: '/overtimeupdate',
      name: 'overtimeupdate',
      component: () => import('../views/OvertimeUpdateView.vue')
    }
  ]
})

export default router
