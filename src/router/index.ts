import { createRouter, createWebHistory } from "vue-router";

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
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/views/NotFoundPage.vue"),
    },
    { path: "/:catchAll(.*)", redirect: "/not-found" },
  ],
});

export default router;
