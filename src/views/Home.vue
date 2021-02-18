<template>
  <div class="wrap">
    <div class="container">
      <v-img :src="require('@/assets/images/aicquire.png')" width="370px" height="100px"></v-img>
      <h2>Login</h2>
      <div class="btns">
        <router-link to="/employerlogin" replace tag="div">
          <v-btn>
            <v-icon small left color="#fff">
              mdi-account-circle outline
            </v-icon>
            Employer
          </v-btn>
        </router-link>
        <router-link to="/jobseekerlogin" replace tag="div">
          <v-btn>
            <v-icon small left color="#fff">
              mdi-briefcase-account-outline
            </v-icon>
            Job Seeker
          </v-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  height: 100vh;
  background-image: url("../assets/images/bldg.jpg");
  background-size: cover;
}
.container {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 5%;
}
.btns {
  display: flex;
  width: 50%;
  justify-content: space-between;
  margin-top: 150px;
}
.v-btn {
  background: #538530 !important;
  color: #ffffff !important;
  text-transform: none !important;
}
</style>
