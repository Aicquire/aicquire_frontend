<template>
  <div class="main-container">
    <EmployerSidebar />
    <div class="wrapper">
      <div class="header"><span>Jobs / Applications</span></div>

      <div class="toolbar-container">
        <v-toolbar class="toolbar" flat height="30">
          <v-icon small left color="#538530">mdi-arrow-left-thick</v-icon>

          <v-toolbar-title class="toolbar-title">{{ this.position }}</v-toolbar-title>

          <template v-slot:extension>
            <v-tabs v-model="model" centered slider-color="#538530">
              <v-tab v-for="(item, index) in items" :key="index" :href="`#tab-${item.value}`">
                {{ item.title }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
      </div>

      <v-tabs-items class v-model="model">
        <v-tab-item class="tab-item" :value="`tab-${1}`">
          <div class="list-container">
            <FirstTabSlider v-bind:position="this.position" />
          </div>
        </v-tab-item>

        <v-tab-item :value="`tab-${2}`">
          <div>
            <div>Settings Template here</div>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import EmployerSidebar from "@/components/employer/EmployerSidebar.vue";
import FirstTabSlider from "@/components/employer/employerJobApplications/FirstTabSlider.vue";
export default {
  name: "EmployerCandidatesList",
  data() {
    return {
      model: "tab-1",
      position: "",
      items: [
        { title: "Candidates", value: 1 },
        { title: "Settings", value: 2 },
      ],
    };
  },

  components: {
    EmployerSidebar,
    FirstTabSlider,
  },
  created() {
    this.position = this.$route.query.position;
  },
};
</script>

<style scoped>
.wrapper {
  margin-left: 210px;
  margin-right: 20px;
  margin-top: 50px;
  height: 100vh;
}

.header {
  width: 100%;
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 3px;
  font-weight: bold;
  padding: 11px 15px;
  font-size: 14px;
  color: #7030a0;
}

.toolbar-title {
  color: #538530;
}

.toolbar-container {
  padding: 0 20px;
  background: #fff;
}

.v-tabs {
  border-bottom: 2px solid #bbb;
}

.v-tab {
  text-transform: none !important;
  text-decoration: none;
}

.v-tab-item.tab-item {
  padding: 20px;
}
</style>
