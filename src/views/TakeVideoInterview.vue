<template>
  <div class="video">
    <EmployerSidebar />

    <div class="videoContainer">
      <!-- MAIN SECTION -->
      <div class="mainSection">
        <!-- MAIN SECTION - HEADER -->
        <v-toolbar flat dense class="mainHeader">
          <v-toolbar-title class="headerTitle">Pre-Interview</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn id="finishLaterBtn" dark small>Finish later</v-btn>
          <v-btn icon id="headerCogBtn">
            <v-icon large>mdi-cog</v-icon>
          </v-btn>
        </v-toolbar>
        <!-- MAIN SECTION - ITEM BUTTONS -->
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
                    v-for="(question, index) in questions"
                    :key="question.id"
                    @click="onClick(index)"
                    >{{ index + 1 }}</v-btn
                  >
                </div>
              </v-btn-toggle>
              <div></div>
            </div>
          </v-col>
          <v-col cols="12" lg="4" order="first" order-md="last">
            <div class="recordSaved"></div>
          </v-col>
        </v-row>
        <!-- MAIN SECTION - VIDEO ESSAY -->
        <v-row class="mainVideo">
          <v-col cols="12" lg="6">
            <v-row>
              <v-col class="essayHeader">
                <span>Question:</span>
              </v-col>
            </v-row>
            <v-row class="textArea">
              <v-textarea v-model="selectedData" filled readonly no-resize rows="11"> </v-textarea>
            </v-row>
          </v-col>
          <v-col cols="12" lg="6">
            <v-row class="videoArea">
              <Video
                v-bind:minutes="this.minutes"
                v-bind:currentMessage="this.currentMessage"
                :key="componentKey"
                @clicked="onClickChild"
              />
            </v-row>
          </v-col>
        </v-row>
      </div>

      <!-- FINISH BUTTON -->
      <div class="finishPreContainer">
        <v-btn id="finishPreBtn" @click="submitPreInterview" dark>Finish Pre-Interview</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import EmployerSidebar from "@/components/employer/EmployerSidebar.vue";
import Video from "@/components/Video.vue";
import axios from "axios";
import { apiURL, store } from "@/store/index.js";

export default {
  data() {
    return {
      iteration: 0,
      index: 0,
      toggle_exclusive: 0,
      questions: [],
      objectID: this.$store.getters.positionApplied,
      minutes: 0,
      selectedData: "",
      componentKey: 0,
      answers: [],
      message: [],
      currentMessage: "",
    };
  },
  components: {
    EmployerSidebar,
    Video,
  },
  created() {
    this.objectID = this.$store.getters.positionApplied;
    axios
      .get(apiURL + "/employee/get-position/" + this.objectID)
      .then((res) => {
        this.questions = res.data["entries"];
        this.selectedData = this.questions[0]["question"];
        this.minutes = this.questions[0]["minutes"];
        this.componentKey += 1;
        if (this.$store.getters.answersGenerated == false) {
          this.questions.forEach((element) => {
            this.answers.push(undefined);
          });
          this.questions.forEach((element) => {
            this.message.push("No Video Response");
          });
          this.currentMessage = this.message[0];
          this.$store.commit("answers", this.answers);
          this.$store.commit("message", this.message);
          this.componentKey += 1;
        } else {
          this.answers = this.$store.getters.answers;
          this.message = this.$store.getters.message;
          this.currentMessage = this.message[this.index];
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    onClick(index) {
      this.iteration = index;
      this.index = index;
      this.selectedData = this.questions[index]["question"];
      this.minutes = this.questions[index]["minutes"];
      this.currentMessage = this.message[this.index];
      this.componentKey += 1;
    },
    onClickChild(value) {
      let answerPayLoad = { iteration: this.index, videoUrl: value };
      let messagePayLoad = { iteration: this.index, videoMessage: "Video Response Saved" };
      this.$store.commit("addAnswer", answerPayLoad);
      this.$store.commit("addMessage", messagePayLoad);
      setTimeout(() => {
        this.$router.go(0);
      }, 1000);
    },
    submitPreInterview: function() {
      let proceed = true;
      this.answers.forEach((element) => {
        if (element == undefined) {
          proceed = false;
        }
      });
      if (proceed) {
        let myJSON = JSON.stringify(this.answers);
        let parsedJSON = JSON.parse(myJSON);
        let payload = { username: this.$store.getters.username, videoResponses: parsedJSON };
        if (!this.$store.getters.completed) {
          axios
            .put(apiURL + "/jobseeker/add-video-response/", payload)
            .then((res) => {
              this.$store.commit("completed", true);
              alert("Submitted Successfully");
              this.$router.push({ name: "JobseekerOrientation" });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          alert("Video Responses Already Uploaded");
        }
      } else {
        alert("Please answer all video interview question");
      }
    },
  },
};
</script>

<style scoped>
.video {
  cursor: default;
  max-height: auto;
  min-height: 100vh;
}
.shadow {
  box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.2);
}
.width.v-btn {
  min-width: 0;
}
/* VIDEO CONTAINER STYLES */
.videoContainer {
  margin: 75px 24px 32px 216px;
}
.mainSection {
  border-radius: 4px;
  margin-bottom: 32px;
  padding: 16px 16px 0;
  background-color: #fff;
}
/* MAIN SECTION - HEADER STYLES */
.mainHeader {
  margin-bottom: 12px;
}
.headerTitle {
  color: #7030a0;
  font-size: 16px;
  font-weight: bold;
}
#finishLaterBtn {
  padding: 0 24px;
  margin-right: 8px;
}
#headerCogBtn {
  color: #000;
}
/* MAIN SECTION - ITEM BUTTONS STYLES */
.mainItems {
  padding: 0 16px;
  margin-bottom: 32px;
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
/* MAIN SECTION - VIDEO ESSAY STYLES */
.mainVideo {
  padding: 0 16px 16px;
}
.essayHeader {
  padding-top: 20px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.essayHeader span {
  font-weight: bold;
  margin-right: 8px;
}
.textArea {
  padding: 24px 16px 0;
}
textarea {
  resize: none !important;
}
/* FINISH BUTTON STYLES */
.finishPreContainer {
  margin: 0;
  padding: 24px 8px;
  border-radius: 4px;
  text-align: center;
  background-color: #fff;
}
#finishPreBtn {
  padding: 24px 32px;
}
#finishLaterBtn,
#finishPreBtn {
  text-transform: none;
  background-color: rgb(83, 133, 48);
}
</style>
