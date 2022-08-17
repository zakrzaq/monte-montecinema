import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage,
    },
    {
      path: "/movies",
      name: "MoviesPage",
      component: () => import("@/views/MoviesPage.vue"),
    },
      {
        path: '/screenings',
        name: 'ScreeingsPage',
        component: () => import('@/views/ScreeningsPage.vue')
      }
  ],
});

export default router;
