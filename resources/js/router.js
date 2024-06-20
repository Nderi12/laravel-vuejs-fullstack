import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./pages/Landing.vue'),
            // meta: { guest: true } // Make sure this is accessible without authentication
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('./pages/Login.vue'),
            meta: { guest: true }
        },
        {
            name: 'register',
            path: '/register',
            component: () => import('./pages/Register.vue'),
            meta: { guest: true }
        },
        {
            name: 'dashboard',
            path: '/dashboard',
            component: () => import('./pages/Dashboard.vue'),
            meta: { requiresAuth: true } // Protect this route
        },
        {
            name: 'strategy-analysis',
            path: '/strategy-analysis',
            component: () => import('./pages/OptionsStrategyAnalyzer.vue'),
            meta: { requiresAuth: true } // Protect this route
        }
    ],
});

// Add a navigation guard
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('accessToken');
    if (to.matched.some(record => record.meta.requiresAuth) && !token) {
        next({ name: 'login' });
    } else if (to.matched.some(record => record.meta.guest) && token) {
        next({ name: 'dashboard' });
    } else {
        next();
    }
});

export default router;
