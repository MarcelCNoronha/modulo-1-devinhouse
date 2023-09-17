<template>
  <v-app-bar app color="primary">
    <v-toolbar-title @click="navigateToDashboard" class="white--text">TRAINSYS</v-toolbar-title>

    <v-btn text to="/dashboard">Home</v-btn>
    <v-btn text to="/lista-alunos">Alunos</v-btn>
    <v-btn text to="/cadastro-exercicio">Exercicios</v-btn>
    <v-btn text to="/">Sair</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    navigateToDashboard() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

