import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import EmployeeList from '../views/employees/EmployeeList.vue';
import Employees from '../views/employees/Employees.vue';
import NotFound from '../views/NotFound.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            meta: {
                title: "Dashboard",
            },
        },
        {
            path: "/employees",
            name: "employees",
            component: EmployeeList,
            meta: {
                title: "Employees",
            },
        },
        {
            path: "/employees_details/:id",
            name: "employees_details",
            component: Employees,
            meta: {
                title: "Employees",
            },
        },
        {
            path: "/:pathMatch(.*)*",
            name: "notfoundpages",
            component: NotFound,
            meta: {
                title: "Not Found",
            },
        },
    ]
})

router.beforeEach((to, from, next) => {
    document.title = `AL Company || ${to.meta.title}`;
    next();
});

export default router;