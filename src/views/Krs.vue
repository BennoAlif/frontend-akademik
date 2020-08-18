<template>
  <div class="krs">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h2">Rencana dan Hasil Studi Mahasiswa</h1>
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
              >Tambah Rencana/Hasil Studi Mahasiswa</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-autocomplete
                  :items="mahasiswa"
                  v-model="editedItem.nim"
                  item-text="nim"
                  item-value="nim"
                  label="Nomor Induk Mahasiswa"
                ></v-autocomplete>
                <v-autocomplete
                  :items="matakuliah"
                  v-model="mk"
                  item-text="nama_mk"
                  item-value="kode_mk"
                  return-object
                  label="Mata kuliah"
                ></v-autocomplete>
                <v-autocomplete
                  :items="dosen"
                  v-model="editedItem.nip"
                  item-text="nama_dosen"
                  item-value="nip"
                  label="Dosen"
                ></v-autocomplete>
                <v-text-field
                  v-model="editedItem.indeks"
                  label="Indeks Nilai"
                ></v-text-field>
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
          :items="krs"
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
    headers: [
      { text: "NIM", value: "nim" },
      { text: "Nama", value: "mahasiswa.nama" },
      { text: "Mata Kuliah", value: "matakuliah.nama_mk" },
      { text: "Dosen", value: "dosen.nama_dosen" },
      { text: "Semester", value: "matakuliah.semester" },
      { text: "SKS", value: "matakuliah.sks" },
      { text: "Indeks", value: "indeks" },
      { text: "Aksi", value: "actions", sortable: false },
    ],
    dialog: false,
    editedIndex: -1,
    id: "",
    search: "",
    dosen: [],
    mk: {},
    editedItem: {
      nim: "",
      nip: "",
      kode_mk: "",
      indeks: "",
    },
    defaultItem: {
      nim: "",
      nip: "",
      kode_mk: "",
      indeks: "",
    },
  }),
  computed: {
    ...mapState(["mahasiswa", "matakuliah", "krs"]),
    formTitle() {
      return this.editedIndex === -1
        ? "Tambah Rencana/Hasil Studi Mahasiswa"
        : "Ubah Rencana/Hasil Studi Mahasiswa";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    mk(val) {
      this.dosen = val.dosen;
      this.editedItem.kode_mk = val.kode_mk;
    },
  },
  created() {
    this.$store.dispatch("getMahasiswa");
    this.$store.dispatch("getKrs");
    this.$store.dispatch("getMatakuliah");
  },
  methods: {
    editItem(item) {
      this.id = item.id;
      this.editedIndex = this.krs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.krs.indexOf(item);
      const data = {
        index,
        id: item.id,
      };
      confirm("Are you sure you want to delete this item?") &&
        this.$store.dispatch("deleteKrs", data);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.mk = {};
        this.editedIndex = -1;
      });
    },

    save() {
      let data = {
        index: this.editedIndex,
        data: this.editedItem,
        where: this.id,
      };
      if (this.editedIndex > -1) {
        this.$store.dispatch("updateKrs", data);
      } else {
        this.$store.dispatch("addKrs", this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style></style>
