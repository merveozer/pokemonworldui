import Vue from "vue";
import Vuex from "vuex";
import axios from "@/axios";
import { router } from "./router";


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    accessToken: "",
  },
  mutations: {
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },
    clearAccessToken(state) {
      state.accessToken = "";
    }
  },
  actions: {
    initAuth({ commit, dispatch }) {
      let accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        let expirationDate = localStorage.getItem("expirationDate");
        let time = new Date().getTime();

        if (time >= +expirationDate) {
          dispatch("logout");
        } else {
          commit("setAccessToken", accessToken);
          let timerSecond = +expirationDate - time;
          dispatch("setTimeoutTimer", timerSecond);
        }
      } else {
       // router.push("/login")
        return false;
      }
    },
    async login({ commit, dispatch }, auth) {
      const expiresIn = 3600000;
      return axios
        .post("http://localhost:8081/auth/login", {
          userName: auth.userName,
          password: auth.password,
        })
        .then((response) => {
          commit("setAccessToken", response.data.accessToken);
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("role", JSON.stringify(Object.values(response.data.role)));
          localStorage.setItem(
            "expirationDate",
            new Date().getTime() + expiresIn
          );
          dispatch("setTimeoutTimer", expiresIn);
        });
    },
    logout({ commit }) {
      commit("clearAccessToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("role");
      router.push("/");
    },
    setTimeoutTimer({ dispatch }, expiresIn) {
      setTimeout(() => {
        dispatch("logout");
      }, expiresIn);
    },

  },
  getters: {
    isAuthenticated(state) {
      return state.accessToken !== "";
    },
  },
});

export default store;
