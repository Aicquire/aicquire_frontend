<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="#538530" dark v-bind="attrs" v-on="on">
          Add Position
        </v-btn>
      </template>
      <v-card class="modalBox">
        <v-card-title class="modalHeader">
          <v-icon left>mdi-briefcase-plus</v-icon>
          <span class="headline">Add Position</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="position"
                    :counter="50"
                    :rules="positionRules"
                    color="#7030a0"
                    label="Position"
                    required
                  ></v-text-field>
                  <v-row>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" class="actionBtn" @click="dialog = false">
                      Close
                    </v-btn>
                    <v-btn
                      :disabled="!valid"
                      class="actionBtn"
                      color="blue darken-1"
                      @click="addPosition(position)"
                    >
                      Add Position
                    </v-btn>
                  </v-row>
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
        <!-- <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="position"
                  label="Position"
                  color="#7030a0"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small class="formNote">*indicates required field</small>
        </v-card-text>
        <v-card-actions class="modalBtn">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="#538530" @click="addPosition(position)" dark elevation="0">
            Save
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import axios from "axios";
import { apiURL } from "@/store/index.js";
export default {
  name: "EmployerAddPosition",
  data: () => ({
    modalShow: false,
    dialog3: false,
    dialogData: "",
    valid: true,
    name: "",
    positionRules: [
      (v) => !!v || "Position is required",
      (v) => (v && v.length <= 50) || "Position must be less than 50 characters",
      (v) => !/[$&+,:;=?@#|"'<>.^*()%!-]/.test(v) || "No special characters allowed",
    ],
    dialog: false,
    position: "",
  }),
  methods: {
    addPosition: function(v) {
      var x = this.$refs.form.validate();
      if (x) {
        axios
          .post(apiURL + "/employee/add-position", { position: v })
          .then((res) => {
            this.jobPositions = res.data;
            console.log(this.jobPositions);
            this.dialogData = "Position Added Successfully";
            this.dialog3 = true;
            this.dialog = false;
          })
          .catch((error) => {
            this.dialogData = "Error adding position";
            this.dialog3 = true;
            console.log(error);
          });
      }
    },
    validationSuccess: function() {
      this.dialog3 = false;
      this.$router.go(0);
    },
  },
};
</script>

<style scoped>
.modalBox {
  padding: 8px 4px 16px;
}
.formNote {
  cursor: default;
  font-style: italic;
  letter-spacing: 0.25px;
}
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
.modalBtn {
  margin-top: 16px;
  border-top: 1px solid #ddd;
}
.modalBtn .v-btn:last-child {
  margin-left: 8px;
}
.actionBtn {
  margin-top: 20px;
  margin-left: 10px;
}
</style>
