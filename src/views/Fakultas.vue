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
          <v-expansion-panel
            v-for="(item, i) in fakultas"
            :key="item.kode_fakultas"
          >
            <v-expansion-panel-header>
              <h3 class="font-weight-light">{{ item.nama_fakultas }}</h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-btn
                color="primary"
                class="my-6"
                dark
                small
                outlined
                @click="editItem(item, item.kode_fakultas)"
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
              <div>
                <v-dialog v-model="dialogJurusan" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      depressed
                      v-bind="attrs"
                      v-on="on"
                      small
                      @click="inp(item)"
                      >Tambah Jurusan</v-btn
                    >
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitleJurusan }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              disabled
                              v-model="item.nama_fakultas"
                              label="Fakultas"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="editedItemJurusan.kode_jurusan"
                              label="Kode Jurusan"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="editedItemJurusan.nama_jurusan"
                              label="Nama Jurusan"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeJurusan"
                        >Cancel</v-btn
                      >
                      <v-btn color="blue darken-1" text @click="saveJurusan(i)"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Kode Jurusan</th>
                      <th class="text-left">Nama Jurusan</th>
                      <th class="text-left">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(e, index) in item.jurusan"
                      :key="e.kode_jurusan"
                    >
                      <td>{{ e.kode_jurusan }}</td>
                      <td>{{ e.nama_jurusan }}</td>
                      <td>
                        <v-icon
                          small
                          class="mr-2"
                          @click="editItemJurusan(e, index, e.kode_jurusan)"
                        >
                          mdi-pencil
                        </v-icon>
                        <v-icon small @click="deleteItemJurusan(e, i)">
                          mdi-delete
                        </v-icon>
                      </td>
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
    dialogJurusan: false,
    editedIndex: -1,
    editedIndexJurusan: -1,
    kode_fakultas: "",
    kode_jurusan: "",
    editedItem: {
      kode_fakultas: "",
      nama_fakultas: "",
    },
    defaultItem: {
      kode_fakultas: "",
      nama_fakultas: "",
    },
    editedItemJurusan: {
      kode_jurusan: "",
      nama_jurusan: "",
      kode_fakultas: "",
    },
    defaultItemJurusan: {
      kode_jurusan: "",
      nama_jurusan: "",
      kode_fakultas: "",
    },
  }),

  computed: {
    ...mapState(["fakultas"]),
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Fakultas" : "Ubah Fakultas";
    },
    formTitleJurusan() {
      return this.editedIndexJurusan === -1 ? "Tambah Jurusan" : "Ubah Jurusan";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogJurusan(val) {
      val || this.close();
    },
  },

  created() {
    this.$store.dispatch("getAllFakultas");
  },

  methods: {
    editItem(item, id) {
      this.kode_fakultas = id;
      this.editedIndex = this.fakultas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    editItemJurusan(item, index, id) {
      this.kode_jurusan = id;
      this.editedIndexJurusan = index;
      this.editedItemJurusan = Object.assign({}, item);
      this.dialogJurusan = true;
    },

    inp(item) {
      this.editedIndexJurusan = -1;
      this.editedItemJurusan.kode_fakultas = item.kode_fakultas;
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

    deleteItemJurusan(item, id) {
      const index = this.fakultas[id].jurusan.indexOf(item);
      const data = {
        index,
        kode_jurusan: item.kode_jurusan,
        id,
      };
      confirm("Are you sure you want to delete this item?") &&
        this.$store.dispatch("deleteJurusan", data);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeJurusan() {
      this.dialogJurusan = false;
      this.$nextTick(() => {
        this.editedItemJurusan = Object.assign({}, this.defaultItemJurusan);
        this.editedIndexJurusan = -1;
      });
    },

    save() {
      let data = {
        index: this.editedIndex,
        data: this.editedItem,
        where: this.kode_fakultas,
      };
      console.log(data);
      if (this.editedIndex > -1) {
        this.$store.dispatch("updateFakultas", data);
      } else {
        this.$store.dispatch("addFakultas", this.editedItem);
      }
      this.close();
    },

    saveJurusan(index) {
      const data = {
        index,
        indexJurusan: this.editedIndexJurusan,
        data: this.editedItemJurusan,
        where: this.kode_jurusan,
      };

      if (this.editedIndexJurusan > -1) {
        this.$store.dispatch("updateJurusan", data);
      } else {
        this.$store.dispatch("addJurusan", data);
      }
      this.closeJurusan();
    },
  },
};
</script>

<style></style>
