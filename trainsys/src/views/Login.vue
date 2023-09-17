<template>
  <v-container>
    <v-form @submit.prevent="handleLogin">
      <v-row justify="center">
        <v-col cols="8" sm="8" md="6">
          <v-card class="pa-4 elevation-10 mt-16">
            <v-card-title class="text-center">
              <h2 class="text-uppercase mb-5" style="font-style: italic">
                TRAINSYS
              </h2>
              <h2 class="headline">Faça Login</h2>
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="email"
                label="E-mail"
                outlined
                :error-messages="errors.email"
                required
              ></v-text-field>
              <span class="message-error" v-if="errors.email">{{
                errors.email
              }}</span>

              <v-text-field
                v-model="password"
                label="Senha"
                type="password"
                outlined
                :error-messages="errors.password"
                required
              ></v-text-field>
              <span class="message-error" v-if="errors.password">{{
                errors.password
              }}</span>
            </v-card-text>

            <v-col cols="12" class="d-flex justify-center">
              <v-btn width="300" type="submit" color="primary"> Login </v-btn>
            </v-col>

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
import * as yup from "yup";
import { captureErrorYup } from "../utils/captureErrorYup.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      errors: {},
    };
  },
  methods: {
    handleLogin() {
      try {
        const schema = yup.object().shape({
          email: yup.string().required("Email é obrigatório"),
          password: yup.string().required("A senha é obrigatória"),
        });

        schema.validateSync(
          {
            email: this.email,
            password: this.password,
          },
          { abortEarly: false }
        );
        axios({
          url: "http://localhost:3000/sessions",
          method: "POST",
          data: {
            email: this.email,
            password: this.password,
          },
        })
          .then((response) => {
            localStorage.setItem("sessions_token", response.data.token);
            localStorage.setItem("sessions_name", response.data.name);

            this.$router.push("/dashboard");
            console.log("logado com sucesso");
          })
          .catch(() => {
            alert("Falha ao realizar login");
          });
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log(error);
          // capturar os errors do yup
          this.errors = captureErrorYup(error);
        }
      }
    },
  },
};
</script>

<style scoped>
.message-error {
  color: red;
  margin: 4px;
}
.input-error {
  border-color: red;
}
</style>
