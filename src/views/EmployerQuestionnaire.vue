<template>
  <div class="main-wrap">
    <div class="sidenavbar-wrap">
      <EmployerSidebar />
    </div>
    <div class="topnavbar-wrap"></div>
    <div class="pagetitle-wrap">
      <span>Jobs Positions / View Questionnaire</span>
    </div>
    <div class="positiontitle-wrap">
      <span>{{ data.position }}</span>
      <div class="back-btn">
        <v-card-actions class="card-actions">
          <v-btn to="/employerjobpositions" dark color="#53852f" small class="view-btn">
            Back<v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
        </v-card-actions>
      </div>
    </div>
    <div class="content-wrap">
      <EmployerQuestionnaireForm />
    </div>
  </div>
</template>

<script>
import EmployerSidebar from "@/components/employer/EmployerSidebar.vue";
import EmployerQuestionnaireForm from "@/components/employer/EmployerQuestionnaireForm.vue";
import { apiURL } from "@/store/index.js";
import axios from "axios";
export default {
  name: "EmployerQuestionnaire",
  components: {
    EmployerSidebar,
    EmployerQuestionnaireForm,
  },
  data() {
    return {
      dialog: false,
      objectID: 0,
      data: [],
    };
  },
  created() {
    this.objectID = this.$route.query.objectID;
    axios
      .get(apiURL + "/employee/get-position/" + this.objectID)
      .then((res) => {
        this.data = res.data;
        console.log(this.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
* {
  font-size: 14px;
}
.main-wrap {
  display: grid;
  height: 100vh;
  grid-template-columns: 190px 1fr;
  grid-template-rows: 40px 40px 20px 60px 1fr;
  grid-template-areas:
    "topnavbar-wrap topnavbar-wrap"
    "sidenavbar-wrap pagetitle-wrap"
    "sidenavbar-wrap positiontitle-wrap"
    "sidenavbar-wrap back-btn"
    "sidenavbar-wrap content-wrap";
}
.sidenavbar-wrap {
  grid-area: sidenavbar-wrap;
  background-color: red;
}
.topnavbar-wrap {
  grid-area: topnavbar-wrap;
  background-color: black;
}
.pagetitle-wrap {
  grid-area: pagetitle-wrap;
  background-color: white;
  border-radius: 5px;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 7.5px;
  padding-top: 9px;
}
.positiontitle-wrap {
  grid-area: positiontitle-wrap;
  background-color: white;
  border-radius: 5px;
  margin-top: 7.5px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 9px;
}
.back-btn {
  grid-area: back-btn;
  border-radius: 5px;
  margin-top: 0px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
}
.content-wrap {
  grid-area: content-wrap;
  background-color: white;
  border-radius: 5px;
  margin-top: -px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
}
.pagetitle-wrap span {
  position: relative;
  color: #702fa0;
  font-weight: bold;
  padding-left: 15px;
}
.positiontitle-wrap span {
  position: relative;
  color: #53852f;
  font-weight: bold;
  padding-left: 15px;
}
.back-btn button {
  background-color: #53852f;
  padding: 9px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;
  color: white;
}
.content-wrap h1 {
  font-weight: normal;
  font-size: 20px;
}
.headline {
  color: #702fa0;
  padding: 15px;
  font-size: 14px;
}
.existing-temp {
  height: 250px;
  width: 400px;
  border: 2px #e0e0e0 solid;
  margin-right: 15px;
  overflow-y: scroll;
}
.new-temp {
  height: 250px;
  width: 260px;
  border: 2px #e0e0e0 solid;
  margin-left: 15px;
}
.card-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.existing-temp h1 {
  padding: 15px;
}
.new-temp h1 {
  padding: 15px;
}
.cancel-btn {
  border: 2px #702fa0 solid;
  margin: 8px;
  color: #702fa0;
}
.open-btn {
  border: 2px #702fa0 solid;
  background-color: #702fa0;
  margin: 8px;
  color: white;
}
.custom-temp {
  height: 100px;
  width: 100px;
  margin-right: 10px;
  background-color: #53852f;
  color: white;
  text-align: center;
}
.custom-temp:hover {
  background-color: #89bd63;
}
.custom-temp h1 {
  font-weight: normal;
}
.default-temp h1 {
  font-weight: normal;
}
.default-temp {
  height: 100px;
  width: 100px;
  margin-left: 10px;
  background-color: #e0e0e0;
  color: black;
  text-align: center;
}
.default-temp:hover {
  background-color: #ffffff;
}
.sample-temp {
  height: 100px;
  width: 100px;
  margin-left: 10px;
  background-color: #e0e0e0;
  color: black;
  text-align: center;
}
.sample-temp:hover {
  background-color: #ffffff;
}
.sample-temp h1 {
  font-weight: normal;
}
.template-block {
  margin-left: 8px;
}
.template-block2 {
  display: flex;
  align-content: center;
  justify-content: center;
}

@media only screen and (max-width: 700px) {
  .content-wrap h1 {
    font-size: 16px;
    justify-content: center;
  }
}
</style>
