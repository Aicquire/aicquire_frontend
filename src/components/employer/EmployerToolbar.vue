<template>
  <div id="nav">
    <v-toolbar tile max-height="40px" color="#FFFFFF" dense>
      <v-toolbar-title class="toolbar-title">
        <v-img
          :src="require('@/assets/images/aicquire.png')"
          height="25px"
          width="100px"
        ></v-img>
        <span class="emp">Employer</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/" active-class="active" tag="div">
        <v-badge color="#E20000" dot overlap left dark content="5">
          <v-icon class="toolbar-icon" size="20" color="#7030a0"
            >mdi-bell</v-icon
          >
        </v-badge>
      </router-link>
      <div class="user">
        <a>Jane Banks</a>
      </div>
      <div class="image-container">
        <v-img
          class="user-image"
          :src="require('@/assets/images/jane.png')"
          height="25px"
          width="25px"
        ></v-img>
      </div>
    </v-toolbar>
  </div>
</template>

<style scoped>
#nav {
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 300;
}
a {
  color: #7030a0 !important;
  text-decoration: none;
  font-size: medium;
  font-weight: 600;
  margin-right: 5px;
  cursor: pointer;
}

.image-container {
  margin-left: 7px;
}
.user-image {
  clip-path: ellipse();
}

.toolbar-title {
  display: inline-flex;
  gap: 15px;
}

.emp {
  color: #5e8b41;
  font-size: 13px;
  padding: 0 3px 5px 3px;
  font-weight: bold;
  font-style: italic;
}

.toolbar-icon {
  padding-right: 15px;
}
</style>
