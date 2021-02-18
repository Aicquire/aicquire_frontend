<template>
  <v-container v-if="!load" class="v-container-no-data">
    <v-card class="parent-card-no-data" flat>
      <div><EmployerCreateUser /></div>
    </v-card>
  </v-container>

  <v-card v-else class="parent-card" flat>
    <!-- CANDIDATES LIST -->
    <div class="candidates-list">
      <v-card class="list-card" flat>
        <!-- CANDIDATES LIST - HEADER -->
        <v-row class="listHeaderContainer">
          <v-col cols="12" class="list-header">Candidate List</v-col>
          <v-col cols="12" class="addCandidateBtn"><EmployerCreateUser /></v-col>
        </v-row>
        <!-- CANDIDATES LIST - SEARCH BAR -->
        <form class="search-form">
          <input type="text" placeholder="Search" />
          <v-icon class="search-icon" color="#bbb">mdi-magnify</v-icon>
        </form>
        <!-- CANDIDATES LIST - FILTER -->
        <div class="filter">
          <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn text v-bind="attrs" v-on="on" block class="filterBtn">
                <v-icon left small>mdi-chevron-down</v-icon>
                <p>Filter</p>
                <v-spacer></v-spacer>
                <span class="filtered-result">{{ filteredresult }}</span>
              </v-btn>
            </template>
            <v-list class="filterList">
              <label class="filterCheckbox">
                <input type="checkbox" class="Asd" /><span class="filterLabel">All</span>
              </label>
              <label class="filterCheckbox">
                <input type="checkbox" /><span class="filterLabel">New</span>
              </label>
              <label class="filterCheckbox">
                <input type="checkbox" /><span class="filterLabel">Archived</span>
              </label>
              <label class="filterCheckbox">
                <input type="checkbox" /><span class="filterLabel">Potential Hire</span>
              </label>
            </v-list>
          </v-menu>
        </div>
        <!--
        <div class="filter">
          <div class="filter-header">Filter</div>
          <form class="filter-form" action="">
            <input type="checkbox" id="all" name="all" value="Bike" />
            <label for="all">All</label>
            <span class="filtered-result">{{ filteredresult }}</span>
            <br />
            <input type="checkbox" id="new" name="new" value="Car" />
            <label for="new">New</label><br />
            <input type="checkbox" id="archived" name="archived" value="Boat" />
            <label for="archived">Archived</label><br />
            <input type="checkbox" id="potential" name="potential" value="Boat" />
            <label for="potential">Potential Hire</label><br /><br />
          </form>
        </div>
        -->
        <!-- CANDIDATES LIST - SORT -->
        <div class="sort">
          <span>Sort</span>
          <select v-model="selected" class="classic">
            <option v-for="option in options" :key="option.value">
              {{ option.value }}
            </option>
          </select>
        </div>
        <!-- CANDIDATES LIST - DATA -->
        <v-container class="v-container">
          <v-row dense class="candidate-list-row">
            <v-col
              class="candidate-list-column"
              cols="12"
              v-for="(item, index) in candidates"
              :key="index"
            >
              <v-card @click.native="onClick(index)" class="applicant-card" color="#f1f2f6">
                <v-card-title class="applicant-name">
                  {{ item.firstname + " " + item.lastname }}
                  <v-spacer></v-spacer>
                  <v-avatar size="32">
                    <img :src="item.avatar" />
                  </v-avatar>
                </v-card-title>
                <v-card-subtitle class="sub-title">
                  <span
                    >Status:<span class="data"> {{ item.status }}</span></span
                  >
                  <div class="applied">
                    <span>Applied on {{ item.dateApplied }}</span>
                  </div>
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>

    <!-- CANDIDATE PROFILE -->
    <div class="score-card">
      <v-card class="applicant-details">
        <v-row class="details">
          <v-col class="details-col" cols="12" md="1">
            <v-avatar class="applicant-avatar" size="48">
              <img :src="this.candidateProfiles[this.iteration].avatar" />
            </v-avatar>
          </v-col>
          <v-col class="details-col" cols="12" md="7">
            <div class="details">
              <v-row dense>
                <v-col class="name" cols="12" md="12">
                  <div class="scorecard-name">
                    {{
                      this.candidateProfiles[this.iteration].firstname +
                        " " +
                        this.candidateProfiles[this.iteration].lastname
                    }}
                  </div>
                </v-col>
              </v-row>
              <v-row dense class="application-details">
                <v-col class="col-one" cols="12" md="5">
                  <span>Position Applied:</span>
                  <span>Date Applied:</span>
                  <span>Contact Number:</span>
                  <span>Email Address</span>
                  <span>Username</span>
                  <span>Password</span>
                </v-col>
                <v-col class="col-two" cols="12" md="7">
                  <span>{{ this.position }}</span>
                  <span>{{ this.candidateProfiles[this.iteration].dateApplied }}</span>
                  <span>{{ this.candidateProfiles[this.iteration].contactNumber }}</span>
                  <span>{{ this.candidateProfiles[this.iteration].emailAddress }}</span>
                  <span>{{ this.candidateProfiles[this.iteration].username }}</span>
                  <span>{{ this.candidateProfiles[this.iteration].password }}</span>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col class="details-col third-col" cols="12" md="4">
            <span>Status</span>
            <span class="data">Potential Hire</span>
            <v-btn dark color="#7030a0" small width="120">View Profile</v-btn>
          </v-col>
        </v-row>
      </v-card>

      <!-- static part of scorecard starts here -->
      <v-row dense class="sched-row">
        <v-card v-if="videoResponses.length > 0" class="schedules" width="61%" height="480px">
          <div class="header-container">
            <div class="schedule-header">Video Interview</div>
          </div>
          <v-row class="mainItems">
            <v-col cols="12" lg="8" class="itemsSec">
              <span>Items:</span>
              <div>
                <v-btn-toggle v-model="toggle_exclusive">
                  <div class="itemsButtons">
                    <v-btn
                      outlined
                      small
                      class="width"
                      v-for="(videoResponse, index) in videoResponses"
                      :key="videoResponse.id"
                      @click="onVideoToggle(index)"
                      >{{ index + 1 }}</v-btn
                    >
                  </div>
                </v-btn-toggle>
                <div></div>
              </div>
            </v-col>
            <v-row class="videoInterviewSection">
              <video-player :options="videoOptions" :key="componentKey" />
            </v-row>
          </v-row>
        </v-card>
        <v-card v-else class="schedules" width="61%" height="480px">
          <div class="header-container">
            <div class="schedule-header">Video Interview</div>
          </div>
          <v-row class="mainItems">
            <div>
              <v-col cols="3" lg="1" class="itemsSec">
                No data available
              </v-col>
            </div>
          </v-row>
        </v-card>
        <v-card class="results" width="38%" height="480px">
          <div class="results-header">Results</div>
          <div class="results-wrap">
            <div class="results-container">
              <span>Minimum Skills Test</span>
              <span class="result-status">Passed</span>
            </div>
            <div class="score">
              <li>Total Score:</li>
              <span><b>77/80</b></span
              ><a class="view-results" href="">View Results</a>
            </div>
          </div>
          <div class="results-wrap">
            <div class="results-container">
              <span>Big 5 Personality Test</span>
              <span class="result-status">Passed</span>
            </div>
            <div class="score">
              <li>Total Score:</li>
              <span><b>42/50</b></span
              ><a class="view-results" href="">View Results</a>
            </div>
          </div>
          <div class="results-wrap">
            <div class="results-container">
              <span>English Proficiency Test</span>
              <span class="result-status">Passed</span>
            </div>
            <div class="score">
              <li>Total Score:</li>
              <span><b>48/50</b></span
              ><a class="view-results" href="">View Results</a>
            </div>
          </div>
          <div class="results-wrap">
            <div class="results-container">
              <span>Pre-Interview</span>
              <span>Unavailable</span>
            </div>
          </div>
        </v-card>
      </v-row>
      <!-- CANDIDATE JOB COMPETENCIES -->

      <v-row dense class="sched-row">
        <v-card class="job-competencies" width="61%" height="590px">
          <div class="competency-header">Job Competencies</div>
          <div class="competency-content">
            <div class="rating">
              <v-combobox
                v-model="chips"
                :items="items"
                chips
                clearable
                label="Please enter competencies"
                multiple
                prepend-icon="mdi-filter-variant"
                solo
              >
                <template v-slot:selection="{ attrs, item, select, selected }">
                  <v-chip
                    v-bind="attrs"
                    :input-value="selected"
                    close
                    @click="select"
                    @click:close="remove(item)"
                  >
                    <strong>{{ item }}</strong>
                  </v-chip>
                </template>
              </v-combobox>
            </div>
          </div>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn depressed dark color="538530" width="90" @click="saveCompetency()"> Save</v-btn>
          </v-row>
        </v-card>
      </v-row>
    </div>
  </v-card>
</template>
<script>
import EmployerCreateUser from "@/components/employer/employerJobApplications/EmployerCreateUser.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
import { apiURL } from "@/store/index.js";
import axios from "axios";
export default {
  name: "ListContent",
  props: ["position"],
  components: {
    EmployerCreateUser,
    VideoPlayer,
  },
  data() {
    return {
      iteration: 0,
      filteredresult: 3,
      componentKey: 0,
      videoIndex: 0,
      selectedCandidate: "",
      selected: "Date(newer first)",
      load: false,
      videoLoad: false,
      loadCompetency: false,
      toggle_exclusive: 0,
      objectID: 0,
      index: 0,
      chips: [],
      items: [],
      videoResponses: [],
      videoOptions: {
        height: 300,
        width: 500,
        autoplay: false,
        controls: true,
        sources: [
          {
            src: "",
            type: "video/mp4",
          },
        ],
      },
      options: [
        { value: "Date(newer first)" },
        { value: "second value" },
        { value: "third value" },
      ],
      candidates: [],
      candidatesProfiles: [],
      competencies: [],
    };
  },
  computed: {
    getOneCandidate: function() {
      return this.candidates[this.iteration];
    },
  },
  methods: {
    onVideoToggle(index) {
      this.videoOptions.sources[0].src = this.videoResponses[index];
      this.componentKey += 1;
    },
    onClick(index) {
      this.selectedCandidateID = this.candidates[index].username;
      this.videoResponses = this.candidateProfiles[index]["videoResponses"];
      this.chips = this.candidates[index]["competencies"];
      this.iteration = index;
      this.videoOptions.sources[0].src = this.videoResponses[0];
      this.componentKey += 1;
      this.index = index;
    },
    saveCompetency() {
      let myJSON = JSON.stringify(this.chips);
      let parsedJSON = JSON.parse(myJSON);
      let payload = { username: this.selectedCandidateID, competencies: parsedJSON };
      axios
        .put(apiURL + "/employee/update-candidate-competency/", payload)
        .then((res) => {
          this.data = res.data;
          this.candidates[this.index].competencies = this.chips;
          this.candidatesProfiles[this.index].competencies = this.chips;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
  },
  created() {
    this.objectID = this.$route.query.id;
    axios
      .get(apiURL + "/employee/get-candidates/" + this.objectID)
      .then((res) => {
        this.candidates = res.data;
        this.candidateProfiles = res.data;
        this.selectedCandidateID = this.candidates[0].username;
        this.chips = this.candidateProfiles[0]["competencies"];
        this.videoResponses = this.candidateProfiles[0]["videoResponses"];
        this.videoOptions.sources[0].src = this.videoResponses[0];
        if (res.data.length > 0) {
          this.load = true;
        }
        if (this.competencies.length > 0) {
          this.loadCompetency = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.parent-card {
  gap: 10px;
  width: 100%;
  padding: 12px 4px;
  display: flex;
  flex-direction: row;
  background-color: #e0e0e0;
}
/* FOR GENERAL CANDIDATES LIST STYLES */
.candidates-list {
  width: 25%;
  cursor: default;
  background: #fff;
  border-radius: 4px;
  padding: 32px 24px 16px;
}
.listHeaderContainer {
  flex-direction: column;
}
.list-header {
  color: #538530;
  font-weight: bold;
}
.addCandidateBtn {
  margin-left: 8px;
  margin-bottom: 8px;
}
/* FOR FILTER STYLES */
.filter {
  margin-bottom: 20px;
}
.filter .filterBtn {
  padding: 4px 12px 4px 4px;
}
.filter .filterBtn p,
.filter .filterBtn .v-icon {
  color: #538530;
  font-weight: bold;
}
.filtered-result {
  color: #fff;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 4px;
  background-color: #7030a0;
}
.filterList {
  padding: 16px 0;
}
.filterCheckbox {
  padding: 4px 8px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.filterLabel {
  color: #666;
  font-size: 14px;
  margin-left: 10px;
}

.schedule-header,
.results-header,
.competency-header {
  color: #538530;
  margin-bottom: 15px;
  font-weight: 600;
}
label {
  margin-left: 8px;
  font-size: 12px;
}
.list-card {
  border-radius: 0 !important;
  background: transparent;
}
.search-form {
  background: #f1f2f6;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3px 10px;
  margin: 15px 0;
  border: 1px solid #bbb;
  border-radius: 5px;
}
input[type="text"] {
  width: 90%;
}
input[type="text"]:focus {
  outline: none;
}
.sort {
  display: flex;
  justify-content: space-between;
  font-size: small;
  padding: 0;
}
.select:focus {
  outline: none;
}
select {
  -webkit-appearance: menulist-button !important;
}

.v-container {
  padding: 10px;
}

.v-container-no-data {
  display: flex;
  justify-content: center;
  padding: 10px;
  background: #e0e0e0;
}

.parent-card-no-data {
  background: #e0e0e0;
}

.candidate-list-row {
  overflow: auto;
  height: 100%;
}

.applicant-card {
  background: #f1f2f6 !important;
  padding: 5px;
  margin-bottom: 8px;
}

.applicant-card:hover {
  background-color: #ccc !important;
}

.applicant-name {
  font-size: small;
  font-weight: bold;
  padding: 0 8px 10px 8px;
}

.sub-title {
  display: flex;
  flex-direction: column;
  padding: 0 8px 10px 8px;
  font-size: small;
}

.data {
  color: #2b580c;
  font-weight: bold;
}

.applied {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.applied span {
  font-size: small;
}

.score-card {
  width: 100%;
  margin: 10px 10px;
}

.score-card,
.name {
  padding: 0;
}

.details {
  padding: 5px 10px;
}
.applicant-details {
  background: #fff;
}

.applicant-avatar {
  margin-left: 5px;
}

.scorecard-name {
  font-size: medium;
  font-weight: bold;
  padding: 0 0 10px 0;
}

.application-details {
  font-size: small;
}

.details-col,
.col-one,
.col-two {
  display: flex;
  flex-direction: column;
  font-size: small;
  gap: 3px;
}

.col-two {
  font-weight: 600;
}

.details-col.third-col {
  align-items: flex-end;
  gap: 6px;
  padding-right: 22px;
}

/* Schedules and Appointments box */

.schedules {
  padding: 20px;
  overflow: auto;
}

.sched-row {
  justify-content: space-between;
  margin: 20px 0 0 0;
}

.added-sched.first,
.added-sched.second,
.added-sched.third,
.added-sched.fourth {
  margin: 0;
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
}

.header-container {
  display: flex;
  justify-content: space-between;
}

.added-sched {
  padding: 5px 10px;
}

.added-sched.first {
  background: #f3e0c0;
  border-radius: 3px;
}

.added-sched.second {
  background: #efb2b1;
  border-radius: 3px;
}

.added-sched.third,
.added-sched.fourth {
  background: #c0ddbf;
  border-radius: 3px;
}

/* Results box */

.results {
  padding: 20px;
  width: 32%;
  overflow: auto;
}

.results-container {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  background-color: #f1f2f6;
  padding: 10px;
  border-radius: 5px;
}

.score {
  display: inline-flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 0 15px 0;
}

.result-status {
  color: #538530;
}

.view-results {
  color: #538530;
  margin-left: 10px;
  text-decoration: underline;
}

/* job competency box */

.job-competencies {
  padding: 20px;
}

.competency-content {
  margin-top: 12px;
  overflow: auto;
}

.ratings,
.comment {
  display: flex;
  flex-direction: column;
}

.ratings-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.rating textarea {
  border: 1px solid #bbb;
  padding: 5px;
  overflow: auto;
  border-radius: 5px;
}

.action-btns {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
}

@media (max-width: 780px) {
  .parent-card {
    display: flex;
    flex-direction: column;
  }
  .filter,
  .candidates-list,
  .score-card,
  .results {
    width: 100%;
  }

  .ratings-wrap {
    display: flex;
    flex-direction: column;
  }
  .job-competencies {
    padding: 20px;
    overflow: scroll;
  }
}
/* MAIN SECTION - ITEM BUTTONS STYLES */
.mainItems {
  padding: 0 16px;
  margin-bottom: 40px;
}
.itemsSec {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 8px 16px;
}
.itemsSec > span {
  margin-top: 4px;
  margin-right: 16px;
  font-weight: bold;
}
.itemsButtons {
  margin-bottom: 8px;
}
.itemsButtons > .v-btn {
  color: #7030a0;
  margin-right: 4px;
}
.itemsSubtext {
  color: #888;
  font-style: italic;
}
.recordSaved {
  text-align: right;
}
.recordSavedText {
  opacity: 0.75;
  padding: 16px 32px;
  font-style: italic;
}
/* VIDEO SECTION */
.videoInterviewSection {
  margin-top: 12px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
</style>
