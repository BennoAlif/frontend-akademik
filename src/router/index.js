import Vue from "vue";
import VueRouter from "vue-router";
import Fakultas from "../views/Fakultas.vue";
import Mahasiswa from "../views/Mahasiswa.vue";
import MataKuliah from "../views/MataKuliah.vue";
import Dosen from "../views/Dosen.vue";
import Krs from "../views/Krs.vue";
import Login from "../views/Login.vue";
import Layout from "../views/Layout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: "/studi-mahasiswa",
    children: [
      {
        path: "/fakultas",
        name: "Fakultas",
        component: Fakultas,
      },
      {
        path: "/studi-mahasiswa",
        name: "Studi Mahasiswa",
        component: Krs,
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
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
