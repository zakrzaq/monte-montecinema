import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: () => import("@/views/HomePage.vue"),
    },
    {
      path: "/movies",
      name: "MoviesPage",
      component: () => import("@/views/MoviesPage.vue"),
    },
    {
      path: "/movies/:id",
      name: "SingleMoviePage",
      component: () => import("@/views/SingleMovie.vue"),
    },
    {
      path: "/screenings",
      name: "ScreeningsPage",
      component: () => import("@/views/ScreeningsPage.vue"),
    },
    {
      path: "/contact",
      name: "ContactPage",
      component: () => import("@/views/ContactPage.vue"),
    },
    {
      path: "/login",
      name: "LoginPage",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/register",
      name: "RegisterPage",
      component: () => import("@/views/RegisterPage.vue"),
    },
    {
      path: "/user",
      name: "UserPage",
      component: () => import("@/views/UserPage.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/empl",
      name: "EmployeePage",
      component: () => import("@/views/EmployeePage.vue"),
      meta: {
        requiresAuth: true,
        requiresEmployee: true,
      },
    },
    {
      path: "/booking",
      name: "BookingPage",
      component: () => import("@/views/BookingPage.vue"),
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/views/NotFoundPage.vue"),
    },
    { path: "/:catchAll(.*)", redirect: "/not-found" },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (to.matched.some((record) => record.meta.requiresEmployee)) {
      userStore.isEmployee ? next() : next({ name: "HomePage" })
    }
    userStore.isLoggedIn ? next() : next({ name: "LoginPage" });
  }
  next();
});

export default router;
