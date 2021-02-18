<template>
  <div class="login-container">
    <EmployerLoggedoutToolbar />
    <div class="card-wrapper">
      <v-card class="login-card">
        <v-form @submit.prevent>
          <div class="top-label">
            Employer Login
          </div>
          <p class="tag-line">Helping build a better future for everyone</p>
          <v-row dense>
            <label for="company-username">Company Username</label>
            <v-col cols="12" sm="12" md="12">
              <v-text-field v-model="company" dense solo type="text"></v-text-field>
            </v-col>
            <label for="management-username">Management Username</label>
            <v-col cols="12" sm="12" md="12">
              <v-text-field v-model="username" dense solo type="text"></v-text-field>
            </v-col>
            <label for="password">Password</label>
            <v-col cols="12" sm="12" md="12">
              <v-text-field v-model="password" dense solo type="password"></v-text-field>
            </v-col>
            <div class="check">
              <div class="checkbox">
                <input
                  id="rememberCheck"
                  type="checkbox"
                  name="rememberCheck"
                  value="rememberCheck"
                />
                <label id="remember" for="rememberMe">Remember me</label>
              </div>
              <a href="#">Forgot your password?</a>
            </div>
          </v-row>
          <button @click="login" type="submit" data-cy="signinSubmitBtn">
            Sign In
          </button>
        </v-form>
        <v-footer absolute class="footer">
          <v-col class="text-center" cols="12">
            <span class="new-to-aicquire">New to aicquire?</span>
            <span class="join-now">
              <router-link to="/employerregistration">
                <a>Join now!</a>
              </router-link>
            </span>
          </v-col>
        </v-footer>
      </v-card>
    </div>
  </div>
</template>

<script>
import EmployerLoggedoutToolbar from "@/components/employer/EmployerLoggedoutToolbar";
import axios from "axios";
import { apiURL, store } from "@/store/index.js";
export default {
  name: "EmployerLogin",
  components: {
    EmployerLoggedoutToolbar,
  },
  data() {
    return {
      username: "",
      password: "",
      company: "",
    };
  },
  methods: {
    login: async function() {
      await axios
        .post(apiURL + "/employee/login/", {
          username: this.username,
          password: this.password,
          company: this.company,
        })
        .then((res) => {
          if (res.data == true) {
            this.$store.commit("employeeLogin", res.data);
            this.$router.replace({ name: "EmployerJobPositions" });
          } else {
            console.log(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.card-wrapper {
  height: 100vh;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: center;
}

.login-card {
  display: flex;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  width: 60%;
  background-image: url("../../assets/images/bldg.png");
  background-size: cover;
}

.top-label {
  margin: 0 0 20px 0;
  font-size: x-large;
  color: #538530;
  font-style: italic;
  font-weight: bold;
}

.tag-line {
  font-size: medium;
  margin: 0 0 25px 5px;
  color: #52575d;
  font-weight: bold;
}

.v-form {
  height: 90%;
  width: 45%;
  margin-bottom: 25px;
}

label {
  padding: 0 20px;
  font-weight: bold;
  font-size: small;
  color: #52575d;
}

.check {
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  padding: 0 5px;
}

#remember {
  padding-left: 0.5em;
}

a {
  text-decoration: none;
  font-weight: bold;
  font-size: small;
  color: #52575d;
}

button {
  border-radius: 5px 5px 5px 50px;
  border: 1px solid #7030a0;
  background: #7030a0;
  color: white;
  font-weight: bold;
  padding: 10px;
  margin-top: 15px;
  letter-spacing: 1px;
  float: right;
  width: 200px;
}

button:focus {
  outline: none;
}

button:hover {
  opacity: 0.8;
}

.footer {
  height: 8%;
  padding: 0.5em;
  text-align: center;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.new-to-aicquire {
  color: #797a7e;
  font-size: small;
}

.join-now a {
  font-size: large;
  color: green;
  font-weight: bolder;
  padding: 5px;
  margin-left: 5px;
  background-color: #f1f2f6;
  cursor: pointer;
  font-style: italic;
}

.join-now a:hover {
  color: #7030a0;
  cursor: pointer;
}

@media (max-width: 700px) {
  .card-wrapper {
    padding: 10px;
  }
  .login-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 20px;
  }

  .v-form {
    width: 100%;
    padding: 10px;
    overflow: scroll;
  }

  .top-label,
  .tag-line {
    display: none;
  }

  .check {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  button {
    border-radius: 5px 5px 5px 50px;
    border: 1px solid #7030a0;
    background: #7030a0;
    color: white;
    font-weight: bold;
    padding: 10px;
    margin-top: 25px;
    letter-spacing: 1px;
    width: 100%;
  }
}
</style>
