<template>
  <v-app>
    <v-main class="grey lighten-2">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4" align="center">
            <v-card class="rounded-lg px-4" max-width="400">
              <v-card-text>
                <span
                  class="text-center text-h4 font-weight-light mb-16 black--text"
                >
                  Sistem Informasi Akademik
                </span>

                <v-text-field
                  v-model="username"
                  label="Username"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  id="password"
                  label="Password"
                  name="password"
                  @click:append="show1 = !show1"
                ></v-text-field>
                <v-btn
                  to="/"
                  type="submit"
                  block
                  class="blue mt-4 white--text"
                  depressed
                  x-large
                  >Login</v-btn
                >
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      username: "",
      password: "",
      rules: {
        required: (value) => !!value || "Password wajib diisi",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },
};
</script>

<style></style>
