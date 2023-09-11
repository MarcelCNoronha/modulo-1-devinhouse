<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-4">
          <v-form @submit.prevent="handleLogin">
            <v-text-field
              v-model="email"
              label="Email"
              outlined
              :error-messages="errorInputEmail"
              required
              class="text-center" 
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              outlined
              :error-messages="errorInputPassword"
              required
              type="password"
              class="text-center" 
            ></v-text-field>
            <v-btn type="submit" block color="primary" class="mx-auto" size="large"
            density="default"
            >Logar</v-btn>
          </v-form>
          <v-alert
            v-if="loginError"
            type="error"
            dismissible
          >
            Falha ao realizar login
          </v-alert>
          <v-divider></v-divider>
          <div class="text-center mt-2">
            <p>Ainda não tem conta? <router-link to="/cadastro">Cadastre-se</router-link></p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      errorInputEmail: '',
      errorInputPassword: '',
      loginError: false,
    }
  },
  methods: {
    handleLogin() {
      this.errorInputEmail = ''
      this.errorInputPassword = ''
      this.loginError = false

      if (!this.email) this.errorInputEmail = 'Digite o email'
      if (!this.password) this.errorInputPassword = 'Digite a senha'

      if (!this.errorInputEmail && !this.errorInputPassword) {
        axios({
          url: 'http://localhost:3000/api/login',
          method: 'POST',
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then((response) => {
          localStorage.setItem("instagram_token", response.data.token)
          localStorage.setItem("instagram_name", response.data.name)
          this.$router.push('/home')
          console.log("logado com sucesso")
        })
        .catch(() => {
          this.loginError = true
        })
      }
    },
  },
}
</script>

<style scoped>

</style>
