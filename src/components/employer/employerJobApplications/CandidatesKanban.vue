<template>
  <div id="app">
    <div class="flex-box">
      <div class="col-box">
        <draggable class="drag">
          <div class="cols" v-for="(column, $columnIndex) of board.columns" :key="$columnIndex">
            <div v-if="column.title === 'Potential Hires'" class="potential-header">
              <span
                >{{ column.title
                }}<v-icon class="down-icon" color="#538530">mdi-menu-down</v-icon></span
              >

              <v-form class="search-form">
                <input type="text" id="search-input" placeholder="Search Candidate" />
                <v-btn class="btn" text><v-icon color="#333333">mdi-magnify</v-icon></v-btn>
              </v-form>

              <div class="sort">
                <span>Sort</span>
                <select v-model="selected" class="classic">
                  <option v-for="option in options" :key="option.value">
                    {{ option.value }}
                  </option>
                </select>
              </div>
            </div>

            <div v-else class="column-title">
              <input
                type="text"
                class="title-input"
                @click="isEditing = !isEditing"
                :value="column.title"
              />
              <v-menu nudge-left="110" nudge-bottom="22">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon right color="#000000" v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
                </template>

                <v-list tile dense outlined elevation="0" class="dots-menu-list">
                  <v-list-item tag="div" class="list-item">
                    <span
                      v-if="!column.candidates.length"
                      @click="$store.commit('REMOVE_COLUMN', column)"
                      >Remove</span
                    >
                    <span v-else @click="notEmpty()">Remove</span>
                  </v-list-item>
                  <v-list-item tag="div" class="list-item">
                    <span>option2</span>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>

            <draggable
              v-if="!column.candidates.length"
              :list="column.candidates"
              :animation="200"
              ghost-class="ghost-card"
              group="candidates"
              class="inner-drag"
            >
              <div class="drag-here">
                <div class="label"><span>Drag candidate card here</span></div>
              </div>
            </draggable>

            <draggable
              v-else
              :list="column.candidates"
              :animation="200"
              ghost-class="ghost-card"
              group="candidates"
              class="inner-drag"
            >
              <candidate-card
                v-for="candidate in column.candidates"
                :key="candidate.id"
                :candidate="candidate"
                class="candidate-card"
              ></candidate-card>
            </draggable>
          </div>
        </draggable>

        <div class="add-step">
          <v-btn
            color="#ffffff"
            class="first-btn"
            height="100"
            width="300"
            @click="hidden = !hidden"
            v-show="!hidden"
          >
            <div class="add-btn">
              <v-btn dark color="#538530" small fab>
                <v-icon>
                  mdi-plus
                </v-icon>
              </v-btn>
              <span><b>Add step</b></span>
            </div>
          </v-btn>
          <v-form class="new-col-form" v-show="hidden">
            <input
              type="text"
              id="add-step-input"
              placeholder="New Column Name"
              v-model="newTitle"
              required
            />
            <div class="second-add-btn">
              <v-btn
                dark
                color="#538530"
                height="40"
                width="100"
                @click="createColumn(), (hidden = !hidden)"
              >
                Add Step
              </v-btn>
              <v-btn text @click="hidden = !hidden">x</v-btn>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import CandidateCard from "./CandidateCard";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    CandidateCard,
    draggable,
  },
  data() {
    return {
      newTitle: "",
      hidden: false,
      empty: false,
      isEditing: null,
      selected: "Date(newer first)",
      options: [
        { value: "Date(newer first)" },
        { value: "second value" },
        { value: "third value" },
      ],
    };
  },
  methods: {
    createColumn() {
      if (this.newTitle.trim() != "") {
        this.$store.commit("CREATE_COLUMN", {
          title: this.newTitle,
        });

        this.newTitle = "";
      } else {
        alert("Please add column name");
      }
    },
    notEmpty() {
      alert("Please empty board first");
    },
  },
  computed: {
    ...mapState(["board"]),
  },
};
</script>

<style scoped>
#app {
  padding: 15px 0 0 0;
  background: #e0e0e0;
}
.col-box {
  background: transparent;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;
  position: absolute;
  width: 100%;
  height: 800px;
}

.drag {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.column-title,
.potential-header {
  background: transparent;
  font-weight: bold;
  padding: 15px;
}

.column-title {
  display: flex;
  justify-content: space-between;
}

.potential-header {
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: #538530;
}

.cols {
  background: #fff;
  width: 300px;
  height: 850px;
}

.inner-drag {
  background: #fff;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 5px;
}

.add-btn,
.new-col-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.new-col-form,
.first-btn {
  background: #fff;
  margin-left: 10px;
  padding: 15px;
  width: 300px;
}

.title-input {
  color: #4f5959;
}

.title-input:focus {
  padding: 5px 10px;
  outline: 1px solid #bbb;
}

#add-step-input {
  background: #f1f2f6;
  border: 1px solid #bbbbbb;
  padding: 10px;
  width: 100%;
}

#add-step-input:focus {
  outline: none;
}

.search-form {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #f1f2f6;
  border: 1px solid #bbbbbb;
  border-radius: 5px;
}

#search-input {
  outline: none;
  padding: 10px;
}

::placeholder {
  font-style: italic;
  font-weight: normal;
  text-align: justify;
}

.second-add-btn {
  display: flex;
  justify-content: left;
  width: 100%;
}

.sort {
  display: flex;
  justify-content: space-between;
  font-size: small;
  margin-top: 10px;
  color: #000000;
}

select,
.select:focus {
  outline: none;
}

select {
  -webkit-appearance: menulist-button !important;
}

.down-icon {
  margin-left: 10px;
}

.dots-menu-list {
  width: 150px;
  background: #fff;
  padding: 0;
}

.list-item:hover {
  background: #f1f2f6;
  cursor: pointer;
}

.candidate-card {
  padding: 5px 10px;
}

.drag-here {
  height: 80px;
  padding: 10px;
}

.label {
  background: #f1f2f6;
  display: grid;
  place-items: center;
  padding: 10px;
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
</style>
