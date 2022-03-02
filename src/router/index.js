import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/chat/rooms',
    
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/chat/rooms',
    name: 'rooms',
    component: () => import('@/views/chat/ChatRoom.vue')
  },
  {
    path: '/chat/room',
    name: 'room',
    component: () => import('@/views/chat/Room.vue'),
    props: true,
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/member/User.vue'),
    props: true,
  },
  {
    path: '/manager',
    name: 'manager',
    component: () => import('@/views/member/Manager.vue'),
    props: true,
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/member/Admin.vue'),
    props: true,
    redirect:'/admin/roleList',
    children:[
      {
        path: 'roleList',
        name: 'roleList',
        component: () => import('@/components/member/MemberRoleList.vue'),
        props: true,
      },
      {
        path: 'alterRole',
        name: 'alterRole',
        component: () => import('@/components/member/MemberRoleAlter.vue'),
        props: true,
      },
    ]
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/Error.vue'),
    props: true,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  duplicateNavigationPolicy: 'ignore',
})

export default router
