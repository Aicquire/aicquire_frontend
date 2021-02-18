<template>
  <div id="app">
    <v-main class="main" data-app>
      <router-view />
    </v-main>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
@font-face {
  font-family: 'Rubik';
  src: local('Rubik'),
    url(./components/fonts/rubik//Rubik-VariableFont_wght.ttf) format('truetype');
}

#app {
  font-family: 'Rubik';
  color: #4f5959;
}

.main {
  padding: 16px;
  background-color: #e0e0e0;
}

.v-btn {
  text-transform: none !important;
}
</style>
