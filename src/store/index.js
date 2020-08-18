import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fakultas: [],
  },
  mutations: {
    set_fakultas(state, data) {
      state.fakultas = data;
    },
    add_fakultas(state, data) {
      state.fakultas.push(data);
    },
    update_fakultas(state, data) {
      Object.assign(state.fakultas[data.index], data.data);
    },
    delete_fakultas(state, data) {
      state.fakultas.splice(data.index, 1);
    },
    add_jurusan(state, data) {
      state.fakultas[data.index].jurusan.push(data.data);
    },
    update_jurusan(state, data) {
      Object.assign(
        state.fakultas[data.index].jurusan[data.indexJurusan],
        data.data
      );
    },
    delete_jurusan(state, data) {
      state.fakultas[data.id].jurusan.splice(data.index, 1);
    },
  },
  actions: {
    getAllFakultas({ commit }) {
      return new Promise((resolve, reject) => {
        Axios({
          url: "fakultas",
          method: "GET",
        })
          .then((res) => {
            console.log(res.data);
            commit("set_fakultas", res.data);
            resolve(res);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    addFakultas({ commit }, data) {
      return new Promise((resolve, reject) => {
        Axios({
          url: "fakultas",
          method: "POST",
          data,
        })
          .then((result) => {
            commit("add_fakultas", data);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    updateFakultas({ commit }, data) {
      return new Promise((resolve, reject) => {
        Axios({
          url: `fakultas/${data.where}`,
          method: "PUT",
          data: data.data,
        })
          .then((result) => {
            commit("update_fakultas", data);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    deleteFakultas({ commit }, data) {
      return new Promise((resolve, reject) => {
        Axios({
          url: `fakultas/${data.kode_fakultas}`,
          method: "DELETE",
        })
          .then((result) => {
            commit("delete_fakultas", data);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    addJurusan({ commit }, data) {
      return new Promise((resolve, reject) => {
        Axios({
          url: "jurusan",
          method: "POST",
          data: data.data,
        })
          .then((result) => {
            commit("add_jurusan", data);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    updateJurusan({ commit }, data) {
      return new Promise((resolve, reject) => {
        Axios({
          url: `jurusan/${data.where}`,
          method: "PUT",
          data: data.data,
        })
          .then((result) => {
            commit("update_jurusan", data);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    deleteJurusan({ commit }, data) {
      return new Promise((resolve, reject) => {
        Axios({
          url: `jurusan/${data.kode_jurusan}`,
          method: "DELETE",
        })
          .then((result) => {
            commit("delete_jurusan", data);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
  },
  modules: {},
});
