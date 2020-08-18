<template>
  <div class="mata-kuliah">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h2">Mata Kuliah</h1>
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
              >Tambah Mata Kuliah</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-text-field
                  v-model="editedItem.kode_mk"
                  label="Kode Mata Kuliah"
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.nama_mk"
                  label="Nama Mata Kuliah"
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.sks"
                  label="SKS"
                  type="number"
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.semester"
                  label="Semester"
                  type="number"
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
        <v-expansion-panels>
          <v-expansion-panel v-for="item in matakuliah" :key="item.kode_mk">
            <v-expansion-panel-header
              ><h3 class="font-weight-light">
                {{ item.kode_mk }} - {{ item.nama_mk }} ({{ item.sks }} SKS)
                Semester {{ item.semester }}
              </h3></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <v-btn
                color="primary"
                class="my-6"
                dark
                small
                outlined
                @click="editItem(item)"
                >Ubah Mata Kuliah</v-btn
              >
              <v-btn
                color="red"
                class="my-6 ml-4"
                dark
                small
                outlined
                @click="deleteItem(item)"
                >Hapus Mata Kuliah</v-btn
              >
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">NIP</th>
                      <th class="text-left">Nama Dosen</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="e in item.dosen" :key="e.nip">
                      <td>{{ e.nip }}</td>
                      <td>{{ e.nama_dosen }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    dialog: false,
    editedIndex: -1,
    kode_mk: "",
    editedItem: {
      kode_mk: "",
      nama_mk: "",
      sks: 0,
      semester: 0,
    },
    defaultItem: {
      kode_mk: "",
      nama_mk: "",
      sks: 0,
      semester: 0,
    },
  }),
  computed: {
    ...mapState(["matakuliah"]),
    formTitle() {
      return this.editedIndex === -1
        ? "Tambah Mata Kuliah"
        : "Ubah Data Mata Kuliah";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.$store.dispatch("getMatakuliah");
  },
  methods: {
    editItem(item) {
      this.kode_mk = item.kode_mk;
      this.editedIndex = this.matakuliah.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.matakuliah.indexOf(item);
      const data = {
        index,
        kode_mk: item.kode_mk,
      };
      confirm("Are you sure you want to delete this item?") &&
        this.$store.dispatch("deleteMatakuliah", data);
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
        where: this.kode_mk,
      };
      if (this.editedIndex > -1) {
        this.$store.dispatch("updateMatakuliah", data);
      } else {
        this.$store.dispatch("addMatakuliah", this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style></style>
