<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list>
        <v-list-item link to="studi-mahasiswa">
          <v-list-item-content>
            <v-list-item-title>Studi Mahasiswa</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="matakuliah">
          <v-list-item-content>
            <v-list-item-title>Mata Kuliah</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="mahasiswa">
          <v-list-item-content>
            <v-list-item-title>Mahasiswa</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="dosen">
          <v-list-item-content>
            <v-list-item-title>Dosen</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="fakultas">
          <v-list-item-content>
            <v-list-item-title>Fakultas & Jurusan</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark clipped-left flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>SIAKAD</v-toolbar-title>
    </v-app-bar>

    <v-main class="grey lighten-5">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <!-- <v-snackbar v-model="snackbar" :color="alertType">
      {{ alertMsg }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          tutup
        </v-btn>
      </template>
    </v-snackbar>-->
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: null,
  }),
};
</script>
