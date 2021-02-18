<template>
  <v-row class="container" justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn id="addBtn" class="button-line" color="#538530" dark small v-bind="attrs" v-on="on">
          <v-icon small left>mdi-account-plus</v-icon>
          <span>Add Candidate</span>
        </v-btn>
      </template>
      <v-card class="modalBox">
        <v-card-title class="modalHeader">
          <v-icon left>mdi-account-plus</v-icon>
          <span class="headline">Add Candidate</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="firstname"
                    :rules="nameRules"
                    label="Firstname*"
                    color="#7030a0"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="lastname"
                    :rules="nameRules"
                    label="Lastname*"
                    color="#7030a0"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="contactNumber"
                    :rules="numberRules"
                    label="Contact Number*"
                    color="#7030a0"
                    minimum:11
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="emailAddress"
                    :rules="emailRules"
                    label="Email Address*"
                    color="#7030a0"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-dialog v-model="dialog3" max-width="500px">
              <v-card>
                <v-card-title>
                  <span>{{ dialogData }}</span>
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-card-actions>
                  <v-btn color="primary" text @click="validationSuccess()">
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-form>
        </v-card-text>
        <v-card-actions class="modalBtn">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn :disabled="!valid" color="#538530" @click="checkForm()" dark elevation="0">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
import { apiURL } from "@/store/index.js";
export default {
  name: "EmployerCreateUser",
  data: () => ({
    dialog: false,
    position: "",
    objectID: 0,
    dialog3: false,
    firstname: "",
    dialogData: "",
    valid: true,
    lastname: "",
    emailAddress: "",
    contactNumber: "",
    videoResponss: [],
    nameRules: [
      (v) => !!v || "Field is required",
      (v) => (v && v.length <= 50) || "Field must be less than 50 characters",
      (v) => !/[$&+,:;=?@#|"'<>.^*()%!-]/.test(v) || "No special characters allowed",
    ],
    emailRules: [
      (v) => !!v || "Field is required",
      (v) => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v) || "Valid email is required",
    ],

    numberRules: [
      (v) => !!v || "Field is required",
      (v) => (v && v.length >= 11) || "Number must be atleast 11 digits",
      (v) => /^[0-9]*$/.test(v) || "Valid number is required",
    ],
  }),
  methods: {
    checkForm: function() {
      var x = this.$refs.form.validate();
      if (x) {
        var v = {
          firstname: this.firstname,
          lastname: this.lastname,
          emailAddress: this.emailAddress,
          contactNumber: this.contactNumber,
          positionApplied: this.objectID,
          videoResponses: [],
        };
        this.addCandidate(v);
      }
    },
    addCandidate: function(v) {
      console.log(v);
      console.log(this.$route.query.objectID);
      axios
        .post(apiURL + "/employee/add-candidate", v)
        .then((res) => {
          this.dialog = false;
          this.dialogData = "Position Added Successfully \n\n" + res.body;
          this.dialog3 = true;
          this.dialog = false;
        })
        .catch((error) => {
          this.dialogData = "Error adding candidate";
          this.dialog3 = true;
          console.log(error);
        });
    },
    validationSuccess: function() {
      this.dialog3 = false;
      this.$router.go(0);
    },
  },
  created() {
    this.position = this.$route.query.position;
    this.objectID = this.$route.query.id;
  },
};
</script>

<style scoped>
.container {
  padding: 4px;
}
.modalBox {
  padding: 8px 4px 16px;
}
.formNote {
  cursor: default;
  font-style: italic;
  letter-spacing: 0.25px;
}
/* ADD CANDIDATE MODAL HEADER STYLES */
.modalHeader {
  margin-bottom: 24px;
  border-bottom: 1px solid #ddd;
}
.modalHeader span {
  cursor: default;
  font-weight: bold;
}
.modalHeader span,
.modalHeader .v-icon {
  color: #538530;
}
/* ADD CANDIDATE MODAL ACTION BUTTONS STYLES */
.modalBtn {
  margin-top: 16px;
  border-top: 1px solid #ddd;
}
.modalBtn .v-btn:last-child {
  margin-left: 8px;
}
</style>
