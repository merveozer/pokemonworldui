import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";

Vue.use(VueRouter);

import HomePage from "./pages/HomePage.vue";
import LoginForm from "./pages/LoginForm.vue";
import RegisterForm from "./pages/RegisterForm"
import Pokemon from "./pages/PokemonPage.vue";

export const router = new VueRouter({
    routes: [
      { path: "/", component: HomePage },
      { path: "/register", component: RegisterForm },
      { path: "/login", component: LoginForm },

      { 
        path: "/pokemon", 
        component: Pokemon,
        beforeEach(to, from, next) {
            if (store.getters.isAuthenticated) {
              next();
            } else {
              next({ path: "/login" });
            }
          },
    },

    ],
    mode: "history",
  });