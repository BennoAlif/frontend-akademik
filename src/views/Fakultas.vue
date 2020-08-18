<template>
  <div class="fakultas">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h2">Fakultas dan Jurusan</h1>
      </v-col>
      <v-col cols="12">
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark depressed v-bind="attrs" v-on="on"
              >Tambah Fakultas</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.kode_fakultas"
                      label="Kode Fakultas"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.nama_fakultas"
                      label="Nama Fakultas"
                    ></v-text-field>
                  </v-col>
                </v-row>
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
      <v-col>
        <v-expansion-panels>
          <v-expansion-panel v-for="item in fakultas" :key="item.kode_fakultas">
            <v-expansion-panel-header>
              <span class="text-h6">{{ item.nama_fakultas }}</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-btn
                color="primary"
                class="my-6"
                dark
                small
                outlined
                @click="editItem(item)"
                >Ubah Fakultas</v-btn
              >
              <v-btn
                color="red"
                class="my-6 ml-4"
                dark
                small
                outlined
                @click="deleteItem(item)"
                >Hapus Fakultas</v-btn
              >
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Kode Jurusan</th>
                      <th class="text-left">Nama Jurusan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="e in item.jurusan" :key="e.kode_jurusan">
                      <td>{{ e.kode_jurusan }}</td>
                      <td>{{ e.nama_jurusan }}</td>
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
    editedItem: {
      kode_fakultas: "",
      nama_fakultas: "",
    },
    defaultItem: {
      kode_fakultas: "",
      nama_fakultas: "",
    },
  }),

  computed: {
    ...mapState(["fakultas"]),
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Fakultas" : "Ubah Fakultas";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.$store.dispatch("getAllFakultas");
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.fakultas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.fakultas.indexOf(item);
      const data = {
        index,
        kode_fakultas: item.kode_fakultas,
      };
      confirm("Are you sure you want to delete this item?") &&
        this.$store.dispatch("deleteFakultas", data);
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
      };
      if (this.editedIndex > -1) {
        this.$store.dispatch("updateFakultas", data);
      } else {
        this.$store.dispatch("addFakultas", this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style></style>
