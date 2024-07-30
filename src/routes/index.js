import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        //auth
        {
            path: "/",
            name: "home",
            component: Home,
            meta: {
                title: "Welcome",
            },
        },
    ]
})

router.beforeEach((to, from, next) => {
    document.title = `AL Company || ${to.meta.title}`;
    next();
});


export default router;