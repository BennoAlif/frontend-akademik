<template>
  <div class="dosen">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h2">Dosen</h1>
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
              >Tambah Dosen</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-text-field
                  v-model="editedItem.nip"
                  label="Nomor Induk Pegawai"
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.nama_dosen"
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
                  v-model="editedItem.agama"
                  label="Agama"
                ></v-text-field>
                <v-select
                  :items="matakuliah"
                  item-text="nama_mk"
                  item-value="kode_mk"
                  v-model="editedItem.kode_mk"
                  label="Mata Kuliah"
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
          :items="dosen"
          :search="search"
          sort-by="nip"
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
    search: "",
    headers: [
      { text: "NIP", value: "nip" },
      { text: "Nama", value: "nama_dosen" },
      { text: "Alamat", value: "alamat" },
      { text: "Jenis kelamin", value: "jenis_kelamin" },
      { text: "Agama", value: "agama" },
      { text: "Mata Kuliah", value: "mata_kuliah.nama_mk" },
      { text: "Aksi", value: "actions", sortable: false },
    ],
    items: [
      { text: "Laki-laki", value: "L" },
      { text: "Perempuan", value: "P" },
    ],
    dialog: false,
    editedIndex: -1,
    nip: "",
    editedItem: {
      nip: "",
      nama_dosen: "",
      alamat: "",
      jenis_kelamin: "",
      agama: "",
      kode_mk: "",
    },
    defaultItem: {
      nip: "",
      nama_dosen: "",
      alamat: "",
      jenis_kelamin: "",
      agama: "",
      kode_mk: "",
    },
  }),
  computed: {
    ...mapState(["dosen", "matakuliah"]),
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Dosen" : "Ubah Data Dosen";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.$store.dispatch("getDosen");
    this.$store.dispatch("getMatakuliah");
  },

  methods: {
    editItem(item) {
      this.nip = item.nip;
      this.editedIndex = this.dosen.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.dosen.indexOf(item);
      const data = {
        index,
        nip: item.nip,
      };
      confirm("Are you sure you want to delete this item?") &&
        this.$store.dispatch("deleteDosen", data);
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
        where: this.nip,
      };
      if (this.editedIndex > -1) {
        this.$store.dispatch("updateDosen", data);
      } else {
        this.$store.dispatch("addDosen", this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style></style>
