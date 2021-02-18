<template>
  <div class="container">
    <v-card class="form-card" flat tile>
      <v-app-bar height="100%" color="#53852f" dark>
        <div class="header">
          <div class="first-line">Video Interview Questionnaire</div>
          <span class="second-line"
            >These are just questions that would allow us to know you better, so take your take in
            answering.</span
          >
        </div>
      </v-app-bar>
      <v-form class="vform" v-for="(question, index) in questions" :key="question.id">
        <v-row class="row" dense>
          <v-row class="row2">
            <v-span>Item no. {{ index + 1 }}</v-span>
            <v-spacer></v-spacer>
            <v-span @click="deleteQuestion(index)">Delete</v-span>
          </v-row>
          <v-textarea
            v-model="question.question"
            :id="`tag-edit-${question.id}`"
            counter
            maxlength="500"
            full-width
            background-color="#f1f2f6"
            type="text"
          ></v-textarea>
        </v-row>

        <v-row class="row2">
          <v-col cols="6">
            <v-subheader>Maximum video recording limit</v-subheader>
          </v-col>

          <v-col cols="3">
            <v-text-field
              v-model="question.minutes"
              :id="`tag-edit-${question.minutes}`"
              type="number"
              suffix="minutes"
              class="alignText"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <br />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="addQuestion">
          Add Question
        </v-btn>
        <v-btn color="blue darken-1" text @click="saveQuestions">
          Save
        </v-btn>
      </v-card-actions>
      <br />
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { apiURL } from "@/store/index.js";
export default {
  name: "EmployerQuestionnaireForm",
  data() {
    return {
      questions: [],
      objectID: 0,
    };
  },
  methods: {
    addQuestion() {
      console.log(this.objectID);
      if (this.questions == undefined) {
        this.questions = [
          {
            questions: "",
            minutes: "",
          },
        ];
      } else
        this.questions.push({
          question: "",
          minutes: "",
        });
    },
    deleteQuestion(index) {
      this.questions.splice(index, 1);
    },
    saveQuestions() {
      let myJSON = JSON.stringify(this.questions);
      let parsedJSON = JSON.parse(myJSON);
      let payload = { id: this.objectID, entries: parsedJSON };
      console.log(payload);
      axios
        .put(apiURL + "/employee/updateEntries/", payload)
        .then((res) => {
          this.data = res.data;
          console.log(this.data);
          this.default = false;
          this.$router.go(0);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.objectID = this.$route.query.objectID;
    axios
      .get(apiURL + "/employee/get-position/" + this.objectID)
      .then((res) => {
        this.questions = res.data["entries"];
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.container {
  display: grid;
  place-items: start;
  margin: 50px 0 0 0;
  border-radius: 5px;
  overflow: auto;
}
.form-card {
  height: inherit;
}
.header,
.form-card,
.vform,
.row {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.row2 {
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  align-items: flex-start;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
.alignText {
  margin-top: -4px;
  width: 90px;
}

.header {
  padding: 10px;
}

.first-line {
  font-size: large;
  font-weight: bold;
  margin-bottom: 3%;
}

.second-line {
  font-style: italic;
  font-size: small;
}

.vform {
  padding: 15px 15px 0 15px;
  background: #fff;
}

.required-label {
  margin-bottom: 20px;
}

.required {
  color: red;
  margin: 0 5px 0 5px;
}

textarea {
  border: 1px solid #bbb;
  padding: 3x;
  background: #f1f2f6;
}

textarea:focus {
  outline: none;
}

::placeholder {
  font-style: italic;
}
</style>
