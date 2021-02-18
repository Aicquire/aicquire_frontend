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
      <span class="home">Home</span>
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

.toolbar-title {
  display: inline-flex;
  gap: 15px;
}

.emp {
  color: #5e8b41;
  font-size: 13px;
  padding: 0 3px 5px 3px;
  font-style: italic;
}

.toolbar-icon {
  padding-right: 15px;
}

.home {
  font-size: 14px;
  color: #898989;
}
</style>
