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

              <v-row justify="space-around" align="stretch">
                <v-col cols="8">
                  <v-text-field
                    v-model="newExercise"
                    label="Digite o nome do exercício"
                    :error-messages="errors.newExercise"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="4" class="text-right">
                  <v-btn @click="addItem" color="primary"> Cadastrar </v-btn>
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
import * as yup from "yup";
import { captureErrorYup } from "../utils/captureErrorYup.js";

export default {
  data() {
    return {
      newExercise: "",
      exercises: [],
      errors: {},
    };
  },
  methods: {
    addItem() {
      try {
        const schema = yup.object().shape({
          newExercise: yup.string().min(1, "O exercicio não pode ser vazio"),
        });
        schema.validateSync(
          {
            newExercise: this.newExercise,
          },
          { abortEarly: false }
        );
        const exercises_token = localStorage.getItem("exercises_token");
        axios({
          url: "http://localhost:3000/exercises",
          method: "post",
          data: {
            description: this.newExercise,
          },
          headers: {
            Authorization: `Bearer ${exercises_token}`,
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
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log(error);
          this.errors = captureErrorYup(error);
        }
      }
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
.message-error {
  color: red;
  margin: 4px;
}
.input-error {
  border-color: red;
}
</style>
