<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline"
            >Bem vindo, {{ activeUser }}</v-card-title
          >
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col :cols="isMobile ? 12 : 6">
        <v-card class="pa-6">
          <v-card-text>
            <v-row>
              <v-col cols="8">
                <v-card-title class="headline">Alunos</v-card-title>
                <v-card-text class="text-h2 mt-5">{{ amountStudents }}</v-card-text>
              </v-col>
              <v-col cols="4">
                <v-avatar size="100">
                  <v-icon size="100">mdi-account-supervisor</v-icon>
                </v-avatar>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <router-link to="/cadastro-aluno">
                <v-btn color="primary">Cadastrar Aluno</v-btn>
              </router-link>
              </v-col>
              <v-col>
                <router-link to="/lista-alunos">
                <v-btn color="primary">Visualizar Alunos</v-btn>
              </router-link>
              </v-col>

            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col :cols="isMobile ? 12 : 6">
        <v-card class="pa-6">
          <v-card-text>
            <v-row>
              <v-col cols="8">
                <v-card-title class="headline">Exercícios</v-card-title>
                <v-card-text class="text-h2 mt-5">{{ amountExercises }}</v-card-text>
              </v-col>
              <v-col cols="4">
                <v-avatar size="100">
                  <v-icon size="100">mdi-dumbbell</v-icon>
                </v-avatar>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <router-link to="/cadastro-exercicio">
                <v-btn color="primary">Cadastrar Exercício</v-btn>
              </router-link>
              </v-col>
            </v-row>
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
      activeUser: "",
      amountStudents: 0,
      amountExercises: 0,
      isMobile: false,
    };
  },

  methods: {
    loadDashboardData() {
      axios({
        url: "http://localhost:3000/dashboard",
        method: "GET",
      })
        .then((response) => {
          this.amountStudents = response.data.amount_students;
          this.amountExercises = response.data.amount_exercises;
        })
        .catch(() => {
          alert("Ocorreu um erro ao buscar os dados do dashboard");
        });
    },
  },

  mounted() {
    this.loadDashboardData();
    this.activeUser = localStorage.getItem("sessions_name");
    this.isMobile = window.innerWidth < 600;
    window.addEventListener("resize", () => {
      this.isMobile = window.innerWidth < 600;
    });
  },
};
</script>
