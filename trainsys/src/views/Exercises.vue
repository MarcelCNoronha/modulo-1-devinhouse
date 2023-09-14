<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="11" class="d-flex align-center">
        <v-avatar size="100">
          <v-icon size="100">mdi-dumbbell</v-icon>
        </v-avatar>
        <v-card-title class="headline">Exercícios</v-card-title>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-form>
              <v-row align="center" class="align-center">
                <v-col cols="10">
                  <v-text-field
                    v-model="newExercise"
                    label="Digite o nome do exercício"
                    class="custom-text-field"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-btn @click="addItem" color="primary" class="mx-auto">
                    Cadastrar
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Nome</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="exercises in exercises" :key="exercises.id">
              <td>{{ exercises.description }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newExercise: "",
      exercises: [],
    };
  },
  methods: {
    addItem() {
      const token = localStorage.getItem("exercises_token");

      axios({
        url: "http://localhost:3000/exercises",
        method: "post",
        data: {
          description: this.newExercise,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          alert("Cadastro com sucesso");
          this.newExercise = "";
        })
        .catch(() => {
          alert("Houve um erro ao realizar o cadastro");
        });
      this.loadExercises();
    },
    loadExercises() {
      const token = localStorage.getItem("exercises_token");

      axios({
        url: "http://localhost:3000/exercises",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          this.exercises = response.data;
        })
        .catch(() => {
          alert("Ocorreu um erro ao buscar os exercícios");
        });
    },
  },
  mounted() {
    this.loadExercises();
  },
};
</script>

<style scoped>
</style>
