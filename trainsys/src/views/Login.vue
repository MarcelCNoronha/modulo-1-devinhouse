<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-10">
          <v-card-title class="text-center">
            <v-img src="@/assets/logo.png" max-width="100" contain></v-img>
            <div class="headline">Faça Login</div>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="email" label="E-mail" outlined></v-text-field>
              <v-text-field v-model="password" label="Senha" type="password" outlined></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>

          <v-divider></v-divider>

          <v-card-actions>
            <div class="text-center">Ainda não tem conta, <a href="/cadastrar">cadastre-se</a></div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
     
    },
  },
};
</script>
