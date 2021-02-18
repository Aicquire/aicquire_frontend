<template>
  <div>
    <EmployerSidebar />

    <div class="wrapper">
      <!-- PAGE HEADER -->
      <div class="header">
        <span>Job Positions</span>
      </div>

      <!-- JOB POSITIONS CARDS CONTAINER -->
      <div class="job-positions">
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" v-for="jobs in jobPositions" :key="jobs.id" dense>
            <!-- JOB POSITIONS CARD -->
            <v-card class="card">
              <v-card-title class="title">
                <v-spacer></v-spacer>
                <v-icon color="#fff">mdi-dots-vertical</v-icon>
              </v-card-title>
              <div class="card-content">
                <p class="job-title">{{ jobs.position }}</p>
                <div class="candidates">
                  <span>4 Candidates<!--{{ jobs.noCandidates }}--></span>
                </div>
              </div>
              <div class="updated">
                <span>Updated 12 hours ago</span>
              </div>
              <!-- JOB POSITION CARD BUTTONS -->
              <v-card-actions class="card-actions">
                <v-btn
                  @click="routeToCandidates(jobs.id)"
                  color="#ddd"
                  small
                  class="view-btn"
                  block
                  elevation="0"
                >
                  <v-spacer></v-spacer>
                  <span>View Job Candidates</span>
                  <v-spacer></v-spacer>
                  <v-icon small>mdi-chevron-right</v-icon>
                </v-btn>
                <v-btn
                  @click="routeToQuestionnaire(jobs.id)"
                  color="#ddd"
                  small
                  class="view-btn"
                  block
                  elevation="0"
                >
                  <v-spacer></v-spacer>
                  <span>View Questionnaire</span>
                  <v-spacer></v-spacer>
                  <v-icon small>mdi-chevron-right</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="4" lg="3" class="add-position">
            <div><EmployerAddPosition /></div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import EmployerSidebar from "@/components/employer/EmployerSidebar.vue";
import EmployerAddPosition from "@/components/employer/EmployerAddPosition.vue";
import { apiURL } from "@/store/index.js";
import axios from "axios";

export default {
  name: "EmployerJobPositions",
  data() {
    return {
      jobPositions: [],
      retrievedData: [],
    };
  },

  mounted() {
    axios
      .get(apiURL + "/employee/get-positions")
      .then((res) => {
        this.jobPositions = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  components: {
    EmployerSidebar,
    EmployerAddPosition,
  },
  methods: {
    routeToQuestionnaire: function(v) {
      axios
        .get(apiURL + "/employee/get-position/" + v)
        .then((res) => {
          this.retrievedData = res.data["id"];
          this.$router.push({
            name: "EmployerQuestionnaire",
            query: { objectID: this.retrievedData },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    routeToCandidates: function(v) {
      let newId = v;
      axios
        .get(apiURL + "/employee/get-position/" + v)
        .then((res) => {
          this.retrievedData = res.data["id"];
          this.$router.push({
            name: "JobPositionCandidates",
            query: { id: this.retrievedData, position: res.data["position"] },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  max-height: auto;
  /*height: 100vh;
  background: #888;*/
  cursor: default;
  margin: 60px 16px 32px 208px;
}
/* FOR HEADER STYLES */
.header,
.subheader {
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  padding: 10px 16px;
  border-radius: 4px;
  margin-bottom: 24px;
  background-color: #fff;
}
.header span {
  color: #7030a0;
}
/* FOR CARD STYLES */
.job-positions {
}
.card {
  color: #fff;
  opacity: 0.8;
  margin: 0 auto 16px;
  min-width: auto;
  max-width: 325px;
  border-radius: 8px;
}
.card:hover {
  opacity: 1;
}
/* FOR CARD CONTENTS STYLES */
.title {
  padding: 16px 8px 4px;
}
.card-content {
  height: 125px;
  padding: 0 8px;
}
.title,
.card-content,
.updated {
  background-color: #538530;
}
.card-content,
.card-actions {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-line-pack: center;
  align-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.job-title {
  margin-bottom: 8px;
}
.candidates span {
  font-size: 12px;
  font-style: italic;
}
.updated {
  padding: 0 12px 10px;
  text-align: right;
}
.updated span {
  font-size: 12px;
}
.card-actions {
  background: #fff;
  padding: 20px 32px;
}
.view-btn {
  color: #111;
  font-size: 12px;
}
.view-btn:first-child {
  margin-bottom: 16px;
}
/* FOR ADD POSITION BUTTON CONTAINER STYLES */
.add-position {
  display: flex;
  align-items: center;
}
.add-position > div {
  margin: 16px auto;
}
</style>
