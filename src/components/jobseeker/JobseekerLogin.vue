<template>
  <div class="login-container">
    <div class="card-container">
      <v-card class="login-card">
        <div class="form-container">
          <div class="aicquire-logo">
            <v-img
              class="mr-3"
              :src="require('@/assets/images/aicquire.png')"
              height="40px"
              width="150px"
            ></v-img>
          </div>
          <p class="tag-line">Job seeking made easier</p>
          <v-form ref="form" v-model="valid" @submit.prevent="login">
            <br />
            <v-text-field
              v-model="username"
              label="Username"
              required
              @input="$v.username.$touch()"
              @blur="$v.username.$touch()"
            ></v-text-field>
            <br />

            <br />
            <v-text-field
              v-model="password"
              solo
              :rules="passwordRules"
              :error-messages="passwordErrors"
              label="Password"
              type="password"
              required
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            ></v-text-field>
            <div class="check">
              <div class="checkbox">
                <input
                  id="rememberCheck"
                  v-model="checked"
                  type="checkbox"
                  name="rememberCheck"
                  value="rememberCheck"
                />
                <label id="remember" for="rememberMe">Remember me</label>
              </div>
              <a href="#">Forgot your password?</a>
            </div>
            <button type="submit" data-cy="signinSubmitBtn" @click="login">
              Sign In
            </button>
          </v-form>

          <div class="social-container">
            <span>Sign in with</span>
            <a href="#" class="social">
              <v-img :src="require('@/assets/images/facebook.png')"></v-img>
            </a>
            <a href="#" class="social">
              <v-img :src="require('@/assets/images/twitter.png')"></v-img>
            </a>
            <a href="#" class="social">
              <v-img :src="require('@/assets/images/instagram.png')"></v-img>
            </a>
            <a href="#" class="social">
              <v-img :src="require('@/assets/images/linkedin.png')"></v-img>
            </a>
          </div>
          <v-footer absolute class="footer">
            <v-col class="text-center" cols="12">
              <span class="new-to-aicquire">New to aicquire?</span>
              <span class="join-now">
                <router-link to="/jobseekerregister">
                  <a>Join now!</a>
                </router-link>
              </span>
            </v-col>
          </v-footer>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { apiURL } from "@/store/index.js";
import axios from "axios";
// var bcrypt = require('bcryptjs');
export default {
  name: "JobSeekerLogin",
  mixins: [validationMixin],
  validations: {
    username: { required },
    password: { required },
  },
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      username: "",
      checked: "",
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
  },

  methods: {
    async login() {
      this.$v.$touch();

      if (this.$refs.form.validate()) {
        await axios
          .post(apiURL + "/jobseeker/login", {
            username: this.username,
            password: this.password,
          })
          .then((res) => {
            if (res.data != "Invalid Credentials") {
              this.$store.commit("jobseekerLogin", res.data["isLoggedIn"]);
              this.$store.commit("positionApplied", res.data["positionApplied"]);
              this.$store.commit("username", res.data["username"]);
              this.$store.commit("completed", res.data["completed"]);
              this.$router.replace({ name: "JobseekerOrientation" });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style scoped>
.card-container {
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

.tag-line {
  font-size: large;
  margin: 10px 0 20px 0;
}

.form-container {
  flex-direction: column;
  width: 45%;
}

.form-container input[type="email"],
.form-container input[type="password"] {
  background: #f1f2f6;
  padding: 6px 8px;
  width: 100%;
  border-radius: 3px;
  height: 35px;
}

.aicquire-logo {
  padding: 0;
}

.check {
  display: flex;
  justify-content: space-between;
}

#remember {
  padding-left: 0.5em;
}

.form-container a,
label {
  color: #4f5959;
  text-decoration: none;
}

button {
  border-radius: 5px 5px 5px 50px;
  border: 1px solid #7030a0;
  background: #7030a0;
  color: white;
  font-weight: bold;
  padding: 8px 50px;
  margin: 20px 0 10px 0;
  letter-spacing: 1px;
  float: right;
}

button:focus {
  outline: none;
}

.social-container {
  display: flex;
  width: 300px;
  max-width: 100%;
  max-height: 100px;
  padding: 5px 0 20px 0;
  width: 100%;
}

.social-container > .social {
  height: 25px;
  width: 25px;
  margin: 5px;
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
  font-size: small;
}

.join-now a {
  font-size: large;
  color: #538530;
  font-weight: bolder;
  padding: 5px;
  margin-left: 5px;
  cursor: pointer;
  font-style: italic;
}

.join-now a:hover {
  color: #7030a0;
  cursor: pointer;
}

@media (max-width: 700px) {
  .card-container {
    height: 100vh;
    margin-top: 20px;
    width: 100%;
  }

  .login-card {
    display: flex;
    padding: 20px;
    width: 100%;
  }
  .form-container {
    width: 100%;
  }

  .check {
    display: flex;
    width: 100%;
    gap: 5px;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
  }

  .aicquire-logo {
    display: none;
  }

  button {
    border-radius: 5px 5px 5px 50px;
    border: 1px solid #7030a0;
    background: #7030a0;
    color: white;
    font-weight: bold;
    padding: 8px 40px;
    margin: 20px 0 10px 0;
    letter-spacing: 1px;
    width: 100%;
  }
}
</style>
