<template>
  <div class="orientation">
    <EmployerSidebar />

    <div class="orientationWrapper">
      <!-- ORIENTATION SECTION -->
      <v-row class="orientationBox">
        <v-card>
          <v-card-title class="cardTitle">{{ preInterviewHeading }}</v-card-title>
          <v-card-text class="cardBody">
            <div v-for="(pretext, i) in preInterviewBody" :key="i">
              <p class="preIntText">{{ pretext.content }}</p>
            </div>
          </v-card-text>
          <div class="cardEnd">
            <span class="font-weight-bold subtitle-1">Good Luck!</span>
          </div>
        </v-card>
      </v-row>

      <!-- BEGIN PRE-INTERVIEW BUTTON -->
      <v-row class="beginButtonBox">
        <v-btn id="beginPreBtn" dark @click="next">Begin Pre-Interview</v-btn>
      </v-row>
    </div>
  </div>
</template>

<script>
import EmployerSidebar from "@/components/employer/EmployerSidebar.vue";
import { apiURL, store } from "@/store/index.js";
import axios from "axios";
export default {
  data() {
    return {
      completed: false,
      preInterviewHeading:
        "This interview comprises of both written and video essay interview types.",
      preInterviewBody: [
        {
          content:
            "For Written Essays, there will be a required number of words for each question.",
        },
        { content: "Note that there will be no time limit for the duration of Written Essays." },
        {
          content:
            "For Video Essays, there will be a time limited video recording of your answers.",
        },
        {
          content:
            "You can also choose to repeat the recording of your answer if you are not satisfied with it.",
        },
      ],
    };
  },
  components: {
    EmployerSidebar,
  },
  created() {
    this.completed = this.$store.getters.completed;
  },
  methods: {
    next: function() {
      if (!this.completed) this.$router.push({ name: "JobseekerVideoInterview" });
      else alert("Already completed video interview");
    },
  },
};
</script>

<style scoped>
.orientation {
  cursor: default;
  max-height: auto;
  min-height: 100vh;
}
/* ORIENTATION SECTION STYLES */
.orientationWrapper {
  margin: 160px 40px 32px 232px;
}
.orientationBox,
.beginButtonBox {
  justify-content: center;
}
.orientationBox .v-card {
  padding: 32px 16px;
  background-color: #fff;
}
.cardTitle {
  margin-bottom: 24px;
}
.cardTitle,
.cardEnd {
  color: #444;
  font-weight: bold;
  text-align: center;
}
.cardBody {
  text-align: center;
}
.preIntText {
  padding: 0;
  margin: 0 0 4px;
}
.cardEnd {
  margin-top: 16px;
}
/* BEGIN PRE-INTERVIEW BUTTON STYLES */
.beginButtonBox {
  margin-top: 40px;
}
#beginPreBtn {
  padding: 24px 16px;
  background-color: #7030a0;
}
</style>
