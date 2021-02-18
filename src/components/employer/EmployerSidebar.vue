<template>
  <div class="container">
    <EmployerToolbar />
    <v-navigation-drawer
      flat
      absolute
      permanent
      left
      width="190px"
      color="#7030a0"
      height="100vh"
      tag="div"
      class="drawer"
    >
      <v-list tag="div" class="list" flat dark dense>
        <v-list-item tag="div" class="item">
          <v-btn text block>
            <v-icon x-small left>{{ dashboard.icon }}</v-icon>
            <v-list-item-content>
              <v-list-item-title class="title">{{ dashboard.title }}</v-list-item-title>
            </v-list-item-content>
          </v-btn>
        </v-list-item>

        <v-list-item tag="div" class="item">
          <v-btn text block @click="signOut">
            <v-icon x-small left>{{ logout.icon }}</v-icon>
            <v-list-item-content>
              <v-list-item-title class="title">{{ logout.title }}</v-list-item-title>
            </v-list-item-content>
          </v-btn>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import EmployerToolbar from "../employer/EmployerToolbar";
import { apiURL, store } from "@/store/index.js";
export default {
  name: "EmployerSidebar",
  components: {
    EmployerToolbar,
  },
  data() {
    return {
      dashboard: { title: "Dashboard", icon: "mdi-view-dashboard" },
      logout: { title: "Logout", icon: "mdi-logout-variant" },
    };
  },
  methods: {
    signOut: function() {
      this.$store.commit("logout");
      this.$router.replace({ name: "Home" });
    },
  },
};
</script>

<style scoped>
.drawer {
  overflow-y: auto;
  margin-top: 40px;
  position: fixed;
}
.list {
  padding: 0;
}

.v-form {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
}

input[type="text"] {
  font-family: "Rubik";
  background: #9d73bf;
  padding: 0 8px;
  margin: 6px;
  width: 135px;
  height: 30px;
  border-radius: 3px;
}

input[type="text"] :focus {
  outline: 1px solid #fff;
}
::placeholder {
  color: #ffffff;
  font-size: 12px;
  font-style: italic;
}
.btn {
  padding: 0 !important;
  width: 30px !important;
  height: 30px !important;
}
.container {
  margin: 0;
  padding: 0;
}
.item {
  padding: 0;
  height: 45px;
}
.item .v-btn {
  height: 100%;
  text-align: left;
}
.item:hover {
  background-color: #9d73bf !important;
  cursor: pointer;
}
.search,
.dropdown {
  margin: 0;
  padding: 0;
}
.item,
.dropdown {
  font-size: x-small;
  background: #8e3dca;
  margin-bottom: 3px;
}
.title {
  font-size: x-small !important;
}
.v-treeview.tree {
  width: 100%;
  padding: 0 !important;
  display: flex;
  flex-direction: column;
}
</style>
