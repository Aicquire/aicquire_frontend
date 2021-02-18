import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const apiURL = "https://aicquire.azurewebsites.net";
// export const apiURL = "https://bf9efed3ac13.ngrok.io";

export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    isLoggedIn: false,
    access: 5,
    positionApplied: 0,
    username: "",
    answers: [],
    message: [],
    answersGenerated: false,
    completed: false,
  },
  mutations: {
    employeeLogin(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
      state.access = 1;
    },
    jobseekerLogin(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
      state.access = 0;
    },
    positionApplied(state, value) {
      state.positionApplied = value;
    },
    username(state, value) {
      state.username = value;
    },
    completed(state, value) {
      state.completed = value;
    },
    answers(state, value) {
      state.answers = value;
      state.answersGenerated = true;
    },
    message(state, value) {
      state.message = value;
    },
    addAnswer(state, value) {
      state.answers[value.iteration] = value.videoUrl;
    },
    addMessage(state, value) {
      state.message[value.iteration] = value.videoMessage;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.access = 5;
      state.positionApplied = 0;
      state.username = "";
      state.answersGenerated = false;
      state.answers = [];
      state.message = [];
      state.completed = false;
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    access: (state) => state.access,
    positionApplied: (state) => state.positionApplied,
    username: (state) => state.username,
    answers: (state) => state.answers,
    message: (state) => state.message,
    completed: (state) => state.completed,
    answersGenerated: (state) => state.answersGenerated,
  },
  actions: {},
  modules: {},
});
