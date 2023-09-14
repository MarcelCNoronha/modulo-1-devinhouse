<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-card>
          <v-card-title class="headline">Bem vindo, {{ usuarioLogado }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="4">
        <v-card>
          <v-row>
            <v-col cols="8">
              <v-card-text class="d-flex align-center">
              <v-card-title class="headline">Alunos</v-card-title>
            <div class="text-h2">{{ numeroAlunos }}</div>
          </v-card-text>
            </v-col>

            <v-col cols="4">
              <v-avatar size="100">
              <v-icon size="100">mdi-account-supervisor</v-icon>
            </v-avatar>
            </v-col>
          </v-row>
          <v-row>
            <v-card-actions>
              <router-link to="/cadastro-aluno">
              <v-btn color="primary">Cadastrar Aluno</v-btn>
            </router-link>
          </v-card-actions>
          </v-row>
        </v-card>
      </v-col>

 

      <v-col cols="4">
        <v-card>
          <v-row>
            <v-col cols="8">
              <v-card-text class="d-flex align-center">
              <v-card-title class="headline">Exercícios</v-card-title>
            <div class="text-h2">{{ numeroExercicios }}</div>
          </v-card-text>
            </v-col>

            <v-col cols="4">
              <v-avatar size="100">
              <v-icon size="100">mdi-dumbbell</v-icon>
            </v-avatar>
            </v-col>
          </v-row>
          <v-row>
            <v-card-actions>
            <router-link to="/cadastro-exercicio">
              <v-btn color="primary">Cadastrar Exercício</v-btn>
            </router-link>
          </v-card-actions>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      usuarioLogado:"",
      numeroAlunos: 0,
      numeroExercicios: 0,
    };
  },

  methods: {
    loadDashboardData() {
      const token = localStorage.getItem("exercises_token"); 
      axios({
        url: "http://localhost:3000/exercises",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          this.numeroExercicios = response.data.length;
        })
        .catch(() => {
          alert("Ocorreu um erro ao buscar os exercícios");
        });
      axios({
        url: "http://localhost:3000/students",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          this.numeroAlunos = response.data.length; 
        })
        .catch(() => {
          alert("Ocorreu um erro ao buscar os alunos");
        });
    },
  },
  mounted() {
    this.loadDashboardData(); 
    this.usuarioLogado = localStorage.getItem("sessions_name");
  },
};
</script>