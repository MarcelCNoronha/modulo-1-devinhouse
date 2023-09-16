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
          <v-col cols="12">
            <v-autocomplete
              v-model="exerciseSelected"
              label="Selecione o Exercício"
              :items="exerciseOptions"
              item-title="description"
              item-value="id"
            ></v-autocomplete>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="repetitions"
              label="Repetições"
              outlined
              :error-messages="errors.repetitions"
              required
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="weight"
              label="Quilos"
              outlined
              :error-messages="errors.weight"
              required
              clearable
            ></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="break_time"
              label="Pausa"
              outlined
              :error-messages="errors.break_time"
              required
              clearable
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-select
              v-model="selectedDay"
              label="Dia da semana"
              :items="day"
              outlined
              :error-messages="errors.day"
              required
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="observations"
              label="Observações para esse treino"
              outlined
              :error-messages="errors.observations"
              required
              clearable
            ></v-textarea>
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
      student_id: "",
      exercise_id: null,
      repetitions: "",
      weight: "",
      break_time: "",
      day: [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
      ],
      observations: "",
      selectedDay: null,
      exerciseOptions: [],
      errors: {},
      exercisesLoaded: false,
      exerciseSelected: null,
    };
  },
  methods: {
    handleCreateStudent() {
      try {
        const schema = yup.object().shape({
          student_id: yup.string().required("Id do estudante é obrigatório"),
          exercise_id: yup.string().required("Id do exercicio é obrigatório"),
          repetitions: yup.string().required("Repetições é obrigatório"),
          weight: yup.string().required("Peso é obrigatório"),
          break_time: yup.string().required("Tempo é obrigatório"),
          day: yup.string().required("Dia é obrigatório"),
          observations: yup.string().required("Observações é obrigatório"),
        });

        schema.validate(
          {
            student_id: this.$route.params.student_id,
            exercise_id: this.exercise_id,
            repetitions: this.repetitions,
            weight: this.weight,
            break_time: this.break_time,
            day: this.selectedDay, // Use selectedDay em vez de day
            observations: this.observations,
          },
          { abortEarly: false }
        );

        axios.post("http://localhost:3000/workouts", {
          student_id: this.student_id,
          exercise_id: this.exercise_id,
          repetitions: this.repetitions,
          weight: this.weight,
          break_time: this.break_time,
          day: this.selectedDay,
          observations: this.observations,
        });

        alert("Treino cadastrado com sucesso");
        this.$router.push("/lista-alunos");
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          this.errors = captureErrorYup(error);
        } else {
          console.error(error);
          alert("Houve uma falha ao tentar cadastrar");
        }
      }
    },
    async searchExercises() {
      if (!this.exercisesLoaded) {
        try {
          const response = await axios.get("http://localhost:3000/exercises");
          this.exerciseOptions = response.data.map((exercise) => ({
            description: exercise.description,
            id: exercise.id,
          }));

          // Agora, definimos exercisesLoaded como verdadeiro para evitar recarregamento
          this.exercisesLoaded = true;
        } catch (error) {
          console.error(error);
          alert("Ocorreu um erro ao buscar os Exercicios");
        }
      }
    },
  },
  mounted() {
    this.searchExercises();
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
