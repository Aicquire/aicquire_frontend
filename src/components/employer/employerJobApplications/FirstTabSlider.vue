<template>
  <div class="main-card" height="90%">
    <div class="toolbar-container"></div>
    <div class="list">
      <div class="list-content">
        <div class="candidate-list">
          <ListContent v-bind:position="this.position" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListContent from "@/components/employer/employerJobApplications/ListContent.vue";

export default {
  name: "FirstTabSlider",
  props: ["position"],
  data() {
    return {
      model: "tab-1",
      items: [
        { title: "List", value: 1 },
        { title: "Hiring Process", value: 2 },
      ],
    };
  },
  components: {
    ListContent,
  },
};
</script>

<style scoped>
.toolbar-container {
  padding: 0 20px 10px 20px;
  background: transparent;
}

.v-tabs {
  border-bottom: 2px solid #bbb;
}

.v-tab {
  text-transform: none !important;
  text-decoration: none;
}

.list {
  background-color: transparent;
  margin-top: 20px;
  width: 100%;
}
.list-content {
  height: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
}

.candidate-list {
  background-color: #e0e0e0 !important;
  width: 100%;
  padding: 10px 0;
  height: 100%;
}
</style>
