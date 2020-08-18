import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Fakultas from "../views/Fakultas.vue";
import Mahasiswa from "../views/Mahasiswa.vue";
import MataKuliah from "../views/MataKuliah.vue";
import Dosen from "../views/Dosen.vue";
import Krs from "../views/Krs.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/fakultas",
    name: "Fakultas",
    component: Fakultas,
  },
  {
    path: "/mahasiswa",
    name: "Mahasiswa",
    component: Mahasiswa,
  },
  {
    path: "/matakuliah",
    name: "Mata Kuliah",
    component: MataKuliah,
  },
  {
    path: "/dosen",
    name: "Dosen",
    component: Dosen,
  },
  {
    path: "/studi-mahasiswa",
    name: "Krs",
    component: Krs,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
