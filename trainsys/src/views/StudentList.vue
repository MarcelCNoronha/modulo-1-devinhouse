<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="11" class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <v-avatar size="100">
            <v-icon size="100">mdi-account-supervisor</v-icon>
          </v-avatar>
          <v-card-title class="headline ml-2">Alunos</v-card-title>
        </div>
        <v-btn width="150" to="/cadastro-aluno" color="primary"> Novo </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-text>

            <v-row justify="space-around" align="stretch">
              <v-col cols="8">
                <v-text-field
                  cols="10"
                  v-model="search"
                  label="Buscar por nome"
                  :error-messages="errors.search"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="text-right">
                <v-btn @click="filterStudents" color="primary"> Buscar </v-btn>
              </v-col>
            </v-row>

            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Nome</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in students" :key="student.id">
                  <td>
                    <h3>{{ student.name }}</h3>
                  </td>
                  <td class="text-right">
                    <v-row class="my-3">
                      <v-col>
                        <v-btn
                      width="200"
                      @click="redirecionarMontarTreino(student.id)"
                      color="primary"
                    >
                      Montar Treino
                    </v-btn>
                      </v-col>
                      <v-col>
                        <v-btn
                      width="200"
                      @click="redirecionarAluno(student.id)"
                      color="primary"
                    >
                      Ver
                    </v-btn>
                      </v-col>
                    </v-row>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import * as yup from "yup";
import { captureErrorYup } from "../utils/captureErrorYup.js";

export default {
  data() {
    return {
      students: [],
      search: "",
      errors: {},
    };
  },
  methods: {
    loadStudents() {
      const students_token = localStorage.getItem("students_token");

      axios({
        url: "http://localhost:3000/students",
        method: "GET",
        headers: {
          Authorization: `Bearer ${students_token}`,
        },
      })
        .then((response) => {
          this.students = response.data.students;
        })
        .catch((error) => {
          alert("Ocorreu um erro ao buscar os alunos");
        });
    },

    filterStudents() {
      try {
        const schema = yup.object().shape({
          search: yup.string().min(1, "A busca não pode ser vazio"),
        });
        schema.validateSync(
          {
            search: this.search,
          },
          { abortEarly: false }
        );

        this.students = this.students.filter((student) =>
          student.name.toLowerCase().includes(this.search.toLowerCase())
        );
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log(error);
          this.errors = captureErrorYup(error);
        }
      }
    },
    redirecionarMontarTreino(id) {
      this.$router.push({ path: `/cadastro-treino/${id}` });
    },
    redirecionarAluno(id) {
      this.$router.push({ path: `/visualizar-treinos/${id}` });
    },
  },
  mounted() {
    this.loadStudents();
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
