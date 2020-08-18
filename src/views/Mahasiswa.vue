<template>
  <div class="mahasiswa">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h2">Mahasiswa</h1>
      </v-col>
      <v-col cols="12">
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              depressed
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              >Tambah Mahasiswa</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-text-field
                  v-model="editedItem.nim"
                  label="Nomor Induk Mahasiswa"
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.nama"
                  label="Nama"
                ></v-text-field>
                <v-select
                  :items="items"
                  v-model="editedItem.jenis_kelamin"
                  label="Jenis Kelamin"
                ></v-select>
                <v-textarea
                  v-model="editedItem.alamat"
                  label="Alamat"
                ></v-textarea>
                <v-text-field
                  v-model="editedItem.tempat_lahir"
                  label="Tempat Lahir"
                ></v-text-field>
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editedItem.tanggal_lahir"
                      label="Tanggal Lahir"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="editedItem.tanggal_lahir"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
                <v-text-field
                  v-model="editedItem.agama"
                  label="Agama"
                ></v-text-field>
                <v-select
                  :items="fakultas"
                  item-text="nama_fakultas"
                  item-value="kode_fakultas"
                  return-object
                  v-model="kode_fakultas"
                  label="Fakultas"
                ></v-select>
                <v-select
                  :items="jurusan"
                  v-model="editedItem.kode_jurusan"
                  item-text="nama_jurusan"
                  item-value="kode_jurusan"
                  label="Jurusan"
                ></v-select>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="mahasiswa"
          :search="search"
          sort-by="nim"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    items: [
      { text: "Laki-laki", value: "L" },
      { text: "Perempuan", value: "P" },
    ],
    menu2: false,
    search: "",
    dialog: false,
    headers: [
      { text: "NIM", value: "nim" },
      { text: "Nama", value: "nama" },
      { text: "Alamat", value: "alamat" },
      { text: "Tempat lahir", value: "tempat_lahir" },
      { text: "Tanggal lahir", value: "tanggal_lahir" },
      { text: "Jenis kelamin", value: "jenis_kelamin" },
      { text: "Agama", value: "agama" },
      { text: "Jurusan", value: "jurusan.nama_jurusan" },
      { text: "Aksi", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    kode_fakultas: "",
    jurusan: [],
    nim: "",
    editedItem: {
      nim: "",
      nama: "",
      alamat: "",
      tempat_lahir: "",
      tanggal_lahir: new Date().toISOString().substr(0, 10),
      jenis_kelamin: "",
      agama: "",
      kode_jurusan: "",
    },
    defaultItem: {
      nim: "",
      nama: "",
      alamat: "",
      tempat_lahir: "",
      tanggal_lahir: new Date().toISOString().substr(0, 10),
      jenis_kelamin: "",
      agama: "",
      kode_jurusan: "",
    },
  }),

  computed: {
    ...mapState(["mahasiswa", "fakultas"]),
    formTitle() {
      return this.editedIndex === -1
        ? "Tambah Mahasiswa"
        : "Ubah Data Mahasiswa";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    kode_fakultas(val) {
      this.jurusan = val.jurusan;
    },
  },

  created() {
    this.$store.dispatch("getMahasiswa");
    this.$store.dispatch("getAllFakultas");
  },

  methods: {
    editItem(item) {
      this.nim = item.nim;
      this.editedIndex = this.mahasiswa.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.mahasiswa.indexOf(item);
      const data = {
        index,
        nim: item.nim,
      };
      confirm("Are you sure you want to delete this item?") &&
        this.$store.dispatch("deleteMahasiswa", data);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      let data = {
        index: this.editedIndex,
        data: this.editedItem,
        where: this.nim,
      };
      if (this.editedIndex > -1) {
        this.$store.dispatch("updateMahasiswa", data);
      } else {
        this.$store.dispatch("addMahasiswa", this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style></style>
