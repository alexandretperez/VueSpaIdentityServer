import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AuthCallback from './views/AuthCallback.vue';
import Protected from './views/Protected.vue';
import { IdentityService } from './services/IdentityService';
import store from './store';

Vue.use(Router);

const identityService = new IdentityService();

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/auth-callback',
            name: 'auth-callback',
            component: AuthCallback
        },
        {
            path: '/protected',
            name: 'protected',
            component: Protected,
            meta: { private: true }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (
        store.getters.isAuthenticated ||
        !to.matched.some(p => p.meta.private)
    ) {
        next();
        return;
    }
    identityService.login();
});

export default router;
