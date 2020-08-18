import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fakultas: [],
    mahasiswa: [],
    matakuliah: [],
    dosen: [],
    krs: [],
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
    set_mahasiswa(state, data) {
      state.mahasiswa = data;
    },
    add_mahasiswa(state, data) {
      state.mahasiswa.push(data);
    },
    update_mahasiswa(state, data) {
      Object.assign(state.mahasiswa[data.index], data.data);
    },
    delete_mahasiswa(state, data) {
      state.mahasiswa.splice(data.index, 1);
    },
    set_matakuliah(state, data) {
      state.matakuliah = data;
    },
    add_matakuliah(state, data) {
      state.matakuliah.push(data);
    },
    update_matakuliah(state, data) {
      Object.assign(state.matakuliah[data.index], data.data);
    },
    delete_matakuliah(state, data) {
      state.matakuliah.splice(data.index, 1);
    },
    set_dosen(state, data) {
      state.dosen = data;
    },
    add_dosen(state, data) {
      state.dosen.push(data);
    },
    update_dosen(state, data) {
      Object.assign(state.dosen[data.index], data.data);
    },
    delete_dosen(state, data) {
      state.dosen.splice(data.index, 1);
    },
    set_krs(state, data) {
      state.krs = data;
    },
    add_krs(state, data) {
      state.krs.push(data);
    },
    update_krs(state, data) {
      Object.assign(state.krs[data.index], data.data);
    },
    delete_krs(state, data) {
      state.krs.splice(data.index, 1);
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
    getMahasiswa({ commit }) {
      return new Promise((resolve, reject) => {
        Axios({
          url: "mahasiswa",
          method: "GET",
        })
          .then((result) => {
            commit("set_mahasiswa", result.data);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    addMahasiswa({ commit }, data) {
      return new Promise((resolve, reject) => {
        Axios({
          url: "mahasiswa",
          method: "POST",
          data,
        })
          .then((result) => {
            commit("add_mahasiswa", data);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    updateMahasiswa({ commit }, data) {
      return new Promise((resolve, reject) => {
        Axios({
          url: `mahasiswa/${data.where}`,
          method: "PUT",
          data: data.data,
        })
          .then((result) => {
            commit("update_mahasiswa", data);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    deleteMahasiswa({ commit }, data) {
      return new Promise((resolve, reject) => {
        Axios({
          url: `mahasiswa/${data.nim}`,
          method: "DELETE",
        })
          .then((result) => {
            commit("delete_mahasiswa", data);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    getMatakuliah({ commit }) {
      return new Promise((resolve, reject) => {
        Axios({
          url: "matakuliah",
          method: "GET",
        })
          .then((result) => {
            commit("set_matakuliah", result.data);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    addMatakuliah({ commit }, data) {
      return new Promise((resolve, reject) => {
        Axios({
          url: "matakuliah",
          method: "POST",
          data,
        })
          .then((result) => {
            commit("add_matakuliah", data);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    updateMatakuliah({ commit }, data) {
      return new Promise((resolve, reject) => {
        Axios({
          url: `matakuliah/${data.where}`,
          method: "PUT",
          data: data.data,
        })
          .then((result) => {
            commit("update_matakuliah", data);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    deleteMatakuliah({ commit }, data) {
      return new Promise((resolve, reject) => {
        Axios({
          url: `matakuliah/${data.kode_mk}`,
          method: "DELETE",
        })
          .then((result) => {
            commit("delete_matakuliah", data);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    getDosen({ commit }) {
      return new Promise((resolve, reject) => {
        Axios({
          url: "dosen",
          method: "GET",
        })
          .then((result) => {
            commit("set_dosen", result.data);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    addDosen({ commit }, data) {
      return new Promise((resolve, reject) => {
        Axios({
          url: "dosen",
          method: "POST",
          data,
        })
          .then((result) => {
            commit("add_dosen", data);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    updateDosen({ commit }, data) {
      return new Promise((resolve, reject) => {
        Axios({
          url: `dosen/${data.where}`,
          method: "PUT",
          data: data.data,
        })
          .then((result) => {
            commit("update_dosen", data);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    deleteDosen({ commit }, data) {
      return new Promise((resolve, reject) => {
        Axios({
          url: `dosen/${data.nip}`,
          method: "DELETE",
        })
          .then((result) => {
            commit("delete_dosen", data);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    getKrs({ commit }) {
      return new Promise((resolve, reject) => {
        Axios({
          url: "krs",
          method: "GET",
        })
          .then((result) => {
            commit("set_krs", result.data);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    addKrs({ commit }, data) {
      return new Promise((resolve, reject) => {
        Axios({
          url: "krs",
          method: "POST",
          data,
        })
          .then((result) => {
            commit("add_krs", data);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    updateKrs({ commit }, data) {
      return new Promise((resolve, reject) => {
        Axios({
          url: `krs/${data.where}`,
          method: "PUT",
          data: data.data,
        })
          .then((result) => {
            commit("update_krs", data);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    deleteKrs({ commit }, data) {
      return new Promise((resolve, reject) => {
        Axios({
          url: `krs/${data.id}`,
          method: "DELETE",
        })
          .then((result) => {
            commit("delete_krs", data);
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
