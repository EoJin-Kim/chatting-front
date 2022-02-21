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

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
