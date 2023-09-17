<template>
  <v-container>
    <v-form @submit.prevent="handleCreateAccount">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="pa-4 elevation-10 mt-16">
            <v-card-title class="text-center">
              <h2 class="text-uppercase mb-5" style="font-style: italic">
                TRAINSYS
              </h2>
              <h2 class="text-center">Criar conta</h2>
            </v-card-title>

            <v-card-text>
              <v-text-field
                v-model="name"
                label="Nome completo"
                outlined
                :error-messages="errors.name"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                label="Email"
                outlined
                :error-messages="errors.email"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Senha"
                outlined
                :error-messages="errors.password"
                required
                type="password"
              ></v-text-field>

              <v-text-field
                v-model="verifyPassword"
                label="Confirma senha"
                outlined
                :error-messages="errors.verifyPassword"
                required
                type="password"
              ></v-text-field>

              <v-select
                v-model="type_plan"
                :items="['bronze', 'silver', 'gold']"
                label="plano"
                outlined
              ></v-select>
            </v-card-text>

            <v-row>
              <v-col class="text-center">
                <v-btn type="submit" color="primary" class="mx-3"
                  >Cadastrar</v-btn
                >
                <router-link to="/"
                  ><v-btn text color="primary" class="mx-3"
                    >Voltar</v-btn
                  ></router-link
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import * as yup from "yup";
import { captureErrorYup } from "../utils/captureErrorYup.js";
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      verifyPassword: "",
      type_plan: "",
      errors: {},
    };
  },
  methods: {
    handleCreateAccount() {
      try {
        // 1 - CRIAR SCHEMA VALIDATION
        const schema = yup.object().shape({
          name: yup.string().required("Nome é obrigatório"),
          email: yup
            .string()
            .email("Email não é valido")
            .required("Email é obrigatório"),
          password: yup
            .string()
            .min(8, "A senha deve ser maior")
            .max(20, "Deve ter entre 8-20 letras")
            .required("A senha é obrigatória"),
          verifyPassword: yup
            .string()
            .required("A confirmação necessária")
            .oneOf([yup.ref("password")], "As senhas devem coincidir"),
          type_plan: yup.string().required("O plano é obrigatório"),
        });

        schema.validateSync(
          {
            name: this.name,
            email: this.email,
            password: this.password,
            verifyPassword: this.verifyPassword,
            type_plan: this.type_plan,
          },
          { abortEarly: false }
        );

        axios({
          url: "http://localhost:3000/users",
          method: "POST",
          data: {
            name: this.name,
            email: this.email,
            password: this.password,
            type_plan: this.type_plan,
          },
        })
          .then(() => {
            alert("Cadastrado com sucesso");
            this.$router.push("/login");
          })
          .catch((error) => {
            console.log(error);
            if (error.response?.data?.message) {
              alert(error.response.data.message);
            } else {
              alert("Houve uma falha ao tentar cadastrar");
            }
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
