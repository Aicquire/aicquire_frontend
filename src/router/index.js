import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { store } from "../store/";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    beforeEnter: goToHome,
  },
  {
    path: "/home",
    beforeEnter: goToHome,
  },

  {
    path: "/login",
    name: "Home",
    beforeEnter: checkIfLoggedIn,
    component: Home,
  },

  //Employer Routes
  {
    path: "/employerlogin",
    name: "EmployerLogin",
    component: () => import("../components/employer/EmployerLogin.vue"),
  },
  {
    path: "/employerjobpositions",
    name: "EmployerJobPositions",
    beforeEnter: employerAccessGuard,
    component: () => import("@/views/EmployerJobPositions.vue"),
  },
  {
    path: "/employersidebar",
    name: "EmployerSidebar",
    beforeEnter: employerAccessGuard,
    component: () => import("@/components/employer/EmployerSidebar.vue"),
  },
  {
    path: "/add-questionnaire",
    name: "EmployerQuestionnaire",
    beforeEnter: employerAccessGuard,
    component: () => import("@/views/EmployerQuestionnaire.vue"),
  },
  {
    path: "/employer-candidateslist",
    name: "JobPositionCandidates",
    beforeEnter: employerAccessGuard,
    component: () => import("@/views/EmployerCandidatesList.vue"),
  },

  //Jobseeker Routes
  {
    path: "/jobseekerLogin",
    name: "JobseekerLogin",
    component: () => import("@/components/jobseeker/JobseekerLogin.vue"),
  },

  {
    path: "/jobseeker-home",
    name: "JobseekerOrientation",
    beforeEnter: jobseekerAccessGuard,
    component: () => import("@/views/Orientation.vue"),
  },
  {
    path: "/videoInterview",
    name: "JobseekerVideoInterview",
    beforeEnter: jobseekerAccessGuard,
    component: () => import("@/views/TakeVideoInterview.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

function employerAccessGuard(to, from, next) {
  var access = store.getters.access;
  if (access == 1) {
    next();
  } else {
    next("/");
  }
}

function jobseekerAccessGuard(to, from, next) {
  var access = store.getters.access;
  if (access == 0) {
    next();
  } else {
    next("/");
  }
}

function checkIfLoggedIn(to, from, next) {
  var isLoggedIn = store.getters.isLoggedIn;
  var access = store.getters.access;
  console.log(isLoggedIn);
  if (isLoggedIn && access == 1) {
    next("/employerjobpositions");
  } else if (isLoggedIn && access == 0) {
    next("/jobseeker-home");
  } else {
    next();
  }
}

function goToHome(to, from, next) {
  var isLoggedIn = store.getters.isLoggedIn;
  var access = store.getters.access;
  console.log(isLoggedIn);
  if (isLoggedIn && access == 1) {
    next("/employerjobpositions");
  } else if (isLoggedIn && access == 0) {
    next("/jobseeker-home");
  } else {
    next("/login");
  }
}
export default router;
