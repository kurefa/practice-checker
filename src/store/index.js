import Vue from "vue";
import Vuex from "vuex";
import data from "@/assets/data.json";
import createPersistedState from "vuex-persistedstate";

const getDefaultState = () => {
  return {
    items: data
  };
};
const state = getDefaultState();
Vue.use(Vuex);
const store = new Vuex.Store({
  state,
  getters: {
    doneItems: state => {
      return state.items.filter(item => item.done);
    },
    notDoneItems: state => {
      return state.items.filter(item => !item.done);
    },
    itemsCount: state => {
      return state.items.length;
    },
    doneItemsCount: (_state, getters) => {
      return getters.doneItems.length;
    },
    notDoneItemsCount: (_state, getters) => {
      return getters.notDoneItems.length;
    }
  },
  mutations: {
    setItems() {
      localStorage.setItem(
        "DefaultState", //初期値をDefaultStateに保存する
        JSON.stringify(getDefaultState())
      );
    },
    resetState(state) {
      Object.assign(
        state, //DefaultStateを呼び出す
        JSON.parse(localStorage.getItem("DefaultState"))
      );
    },
    changeDone(state, id) {
      const index = state.items.findIndex(item => item.id === id);
      if (index >= 0) {
        state.items[index].done = !state.items[index].done;
      }
    }
  },
  actions: {
    readItems({ commit }) {
      commit("setItems");
    },
    changeDone({ commit }, id) {
      commit("changeDone", id);
    },
    resetItems({ commit }) {
      commit("resetState");
    }
  },
  plugins: [createPersistedState()]
});
export default store;
