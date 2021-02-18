<template>
  <div class="container">
    <v-card class="applicant-card" color="#f1f2f6">
      <v-card-title class="applicant-name">
        {{ candidate.name }}
        <v-spacer></v-spacer>
        <v-avatar size="32">
          <img :src="candidate.avatar" />
        </v-avatar>
      </v-card-title>
      <v-card-subtitle class="sub-title">
        <span>
          progress:
          <span class="data">{{ candidate.progress }}</span></span
        ></span
        >
        <div class="applied">
          <span>applied on {{ candidate.applied }}</span>
        </div>
      </v-card-subtitle>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    candidate: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style scoped>
.applicant-card {
  background: #f1f2f6 !important;
  padding: 10px 5px;
  margin-bottom: 5px;
}

.applicant-card:hover {
  background-color: #ccc !important;
  cursor: pointer;
}

.applicant-name {
  font-size: small;
  font-weight: bold;
  padding: 0 8px 10px 8px;
}

.sub-title {
  display: flex;
  flex-direction: column;
  padding: 0 8px 10px 8px;
  font-size: small;
}

.data {
  color: #2b580c;
  font-weight: bold;
}

.applied {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.applied span {
  font-size: small;
}
</style>
