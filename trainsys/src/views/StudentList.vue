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
        <v-btn to="/cadastro-aluno" color="primary"> Novo </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="10">
                <v-text-field
                  v-model="busca"
                  label="Buscar por nome"
                ></v-text-field>
              </v-col>
              <v-col cols="2" class="text-right">
                <v-btn @click="filtrarAlunos" color="primary"> Buscar </v-btn>
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
        <td><h3>{{ student.name }}</h3></td>
        <td class="text-right">
          <v-btn
            @click="redirecionarMontarTreino(student.id)"
            color="primary"
            class="mr-3"
          >
            Montar Treino
          </v-btn>
          <v-btn
            @click="redirecionarAluno(student.id)"
            color="primary"
          >
            Ver
          </v-btn>
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

export default {
  data() {
    return {
      students: [],
      busca: "",
    };
  },
  methods: {
    carregarAlunos() {
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
    filtrarAlunos() {
      if (this.busca.trim() === "") {
        this.carregarAlunos();
      } else {
        this.students = this.students.filter((student) =>
          student.name.toLowerCase().includes(this.busca.toLowerCase())
        );
      }
    },
    redirecionarMontarTreino(id) {
      this.$router.push({ path: `/workouts/${id}` });
    },
    redirecionarAluno(id) {
      this.$router.push({ path: `/workouts/check/${id}` });
    },
  },
  mounted() {
    this.carregarAlunos();
  },
};
</script>
