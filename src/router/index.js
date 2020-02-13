import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Login from '@/pages/login/Login'
import Cadastro from '@/pages/cadastro/Cadastro'
import Chatbot from '@/pages/chatbot/Chatbot'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true 
      },
    },
    {
      path: '/chatbot',
      name: 'Chatbot',
      component: Chatbot,
      meta: {
        requiresAuth: true 
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/cadastro',
      name: 'Cadastro',
      component: Cadastro
    }
  ]
})

router.beforeEach((req, res, next) => {
  if (req.matched.some(route => route.meta.requiresAuth)) {
    if (sessionStorage.getItem('usuario')) {
      next();
    } else {
      next({ path: '/cadastro' });
    }
  }
  next();
});

export default router;
