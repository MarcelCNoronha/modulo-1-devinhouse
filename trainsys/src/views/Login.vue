<template>
  <v-container>
    <v-form @submit.prevent="handleLogin">
      <v-row justify="center">
        <v-col cols="8" sm="8" md="6">
          <v-card class="pa-4 elevation-10">
            <v-card-title class="text-center">
              <v-img src="@/assets/logo.png" max-width="100" contain></v-img>
              <h2 class="headline">Faça Login</h2>
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="email"
                label="E-mail"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Senha"
                type="password"
                outlined
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn type="submit" color="primary" class="mx-auto">
                Login
              </v-btn>
            </v-card-actions>
            <v-card-actions>
              <div class="text-center">
                Ainda não tem conta?
                <router-link to="/cadastro-usuario">Cadastre-se</router-link>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {handleLogin() {
      this.errorInputEmail = ''
      this.errorInputPassword = ''

      if (this.email === '') this.errorInputEmail = 'Digite o email'
      if (this.password === '') this.errorInputPassword = 'Digite a senha'

      if (this.errorInputEmail === '' && this.errorInputPassword === '') {
        
        axios({
          url: 'http://localhost:3000/sessions',
          method: 'POST',
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then((response) => {
          
          localStorage.setItem("sessions_token", response.data.token)
          localStorage.setItem("sessions_name", response.data.name)

          this.$router.push('/dashboard')
          console.log("logado com sucesso")
        })
        .catch(() => {
          alert("Falha ao realizar login")
        })

      }
    },
  }
}
</script>

<style scoped></style>

