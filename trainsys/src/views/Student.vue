<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col cols="2">
          <v-avatar size="100">
            <v-icon size="100">mdi-account-supervisor</v-icon>
          </v-avatar>
        </v-col>
        <v-col cols="10">
          <v-card-text class="d-flex align-center">
            <v-card-title class="headline">Alunos</v-card-title>
          </v-card-text>
        </v-col>
      </v-row>

      <v-form @submit.prevent="handleCreateStudent">
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="name"
              label="Nome completo"
              outlined
              :error-messages="errors.name"
              required
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="email"
              label="Email"
              outlined
              :error-messages="errors.email"
              required
              clearable
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="contact"
              label="Contato"
              outlined
              :error-messages="errors.contact"
              required
              clearable
            ></v-text-field
          ></v-col>
          <v-col cols="6">
            <v-text-field
              v-model="date_birth"
              label="Data de Nascimento"
              type="date"
              outlined
              :error-messages="errors.date_birth"
              required
              clearable
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="cep"
              label="Cep"
              outlined
              :error-messages="errors.cep"
              required
              clearable
              @input="searchCep"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="street"
              label="Logradouro"
              outlined
              :error-messages="errors.street"
              required
              clearable
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="province"
              label="Estado"
              outlined
              :error-messages="errors.province"
              required
              clearable
            ></v-text-field
          ></v-col>

          <v-col cols="6">
            <v-text-field
              v-model="city"
              label="Cidade"
              outlined
              :error-messages="errors.city"
              required
              clearable
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="neighborhood"
              label="Bairro"
              outlined
              :error-messages="errors.neighborhood"
              required
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="number"
              label="Numero"
              outlined
              :error-messages="errors.number"
              required
              clearable
            ></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="complement"
              label="Complemento"
              outlined
              :error-messages="errors.neighborhood"
              required
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <v-btn type="submit" color="primary" class="mb-5">Cadastrar</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
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
      contact: "",
      date_birth: "",
      cep: "",
      street: "",
      province: "",
      neighborhood: "",
      city: "",
      number: "",
      complement: "",
      errors: {},
    };
  },
  methods: {
    handleCreateStudent() {
      try {
        // 1 - CRIAR SCHEMA VALIDATION
        const schema = yup.object().shape({
          name: yup.string().required("Nome é obrigatório"),
          email: yup
            .string()
            .email("Email não é valido")
            .required("Email é obrigatório"),
        });

        schema.validateSync(
          {
            name: this.name,
            email: this.email,
            contact: this.contact,
            date_birth: this.date_birth,
            cep: this.cep,
            street: this.street,
            province: this.province,
            neighborhood: this.neighborhood,
            city: this.city,
            number: this.number,
            complement: this.complement,
          },
          { abortEarly: false } // importante
        );

        // Cadastro de usuario
        const students_token = localStorage.getItem("students_token");

        axios({
          url: "http://localhost:3000/students",
          method: "POST",
          data: {
            name: this.name,
            email: this.email,
            contact: this.contact,
            date_birth: this.date_birth,
            cep: this.cep,
            street: this.street,
            province: this.province,
            neighborhood: this.neighborhood,
            city: this.city,
            number: this.number,
            complement: this.complement,
          },
          headers: {
            Authorization: `Bearer ${students_token}`,
          },
        })
          .then(() => {
            alert("Aluno cadastrado com sucesso");
            this.$router.push("/dashboard");
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
    searchCep() {
      if (this.cep && this.cep.length >= 8) {
        try {
          const schema = yup.object().shape({
            cep: yup.string().required("CEP é obrigatório"),
          });

          schema.validateSync(
            {
              cep: this.cep,
            },
            { abortEarly: false }
          );

          axios({
            url: `https://viacep.com.br/ws/${this.cep}/json/`,
            method: "GET",
          })
            .then((response) => {
              const data = response.data;

              this.street = data.logradouro || "";
              this.province = data.uf || "";
              this.neighborhood = data.bairro || "";
              this.city = data.localidade || "";

              this.errors.cep = [];
              this.cepComplete = true;
            })
            .catch(() => {
              alert("Ocorreu um erro ao buscar os dados do CEP");
              this.cepComplete = false;
            });
        } catch (error) {
          if (error instanceof yup.ValidationError) {
            console.log(error);
            this.errors = captureErrorYup(error);
          }
        }
      } else {
        this.cepComplete = false;
        this.street = "";
        this.province = "";
        this.neighborhood = "";
        this.city = "";
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
