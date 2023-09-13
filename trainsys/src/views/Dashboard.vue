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
              <v-card-title class="headline">Alunos</v-card-title>
              <v-card-text>
                <v-avatar size="100">
                <v-icon size="100">mdi-account-supervisor</v-icon>
              </v-avatar>
                <div class="text-h2">{{ numeroAlunos }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="cadastrarAluno">Cadastrar Aluno</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
  
          <v-col cols="4">
            <v-card>
              <v-card-title class="headline">Exercícios</v-card-title>
              <v-card-text>
                <v-avatar size="100">
                <v-icon size="100">mdi-dumbbell</v-icon>
              </v-avatar>
                <div class="text-h2">{{ numeroExercicios }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="cadastrarExercicio">Cadastrar Exercício</v-btn>
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
        usuarioLogado: "Nome do Usuário",
        numeroAlunos: this.alunos, 
        numeroExercicios: this.exercicios, 
      };
    },
    methods: {
      cadastrarAluno() {
        
      },
      cadastrarExercicio() {
        
      },
    },
  };
  </script>
  