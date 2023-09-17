<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline"
            >Aluno - {{ student_name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th
                    class="text-left"
                    style="font-size: 25px; font-weight: bold"
                  >
                    Hoje
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="workout in currentDayWorkouts" :key="workout.id">
                  <td>
                    <div class="workout-details">
                      <span>{{ workout.exercise_description }}</span> ||
                      <span>{{ workout.weight }} Kg</span> ||
                      <span>{{ workout.repetitions }} repetições</span> ||
                      <span>{{ workout.break_time }} min de pausa</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-btn-toggle v-model="selectedDay" mandatory>
              <v-btn
                v-for="(day, index) in daysOfWeek"
                :key="index"
                :value="day"
                class="day-button"
              >
                {{ day }}
              </v-btn>
            </v-btn-toggle>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th
                    class="text-left"
                    style="font-size: 25px; font-weight: bold"
                  >
                  Treino - {{ selectedDay }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="workout in selectedDayWorkouts" :key="workout.id">
                  <td>
                    <div class="workout-details">
                      <span>{{ workout.exercise_description }}</span> ||
                      <span>{{ workout.weight }} Kg</span> ||
                      <span>{{ workout.repetitions }} repetições</span> ||
                      <span>{{ workout.break_time }} min de pausa</span>
                    </div>
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
      student_name: "",
      currentDay: "",
      daysOfWeek: [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
      ],
      selectedDay: null,
      exercises: [],
      studentId: null,
      workouts: [],
      usuarioLogado: "",
    };
  },

  computed: {
    currentDayWorkouts() {
      return this.workouts.filter((workout) => workout.day === this.currentDay);
    },

    selectedDayWorkouts() {
      return this.workouts.filter((workout) => workout.day === this.selectedDay);
    },
  },

  methods: {
    loadWorkoutsData() { 
         const studentId = this.$route.params.student_id;
      axios
        .get(`http://localhost:3000/workouts?student_id=${studentId}`)
        .then((response) => {
          this.workouts = response.data.workouts;
          console.log("Workouts:", this.workouts); 

          if (this.workouts.length > 0) {
            this.student_name = this.workouts[0].student_name;
          } else {
            this.student_name = "";
          }
        })
        .catch(() => {
          alert("Ocorreu um erro ao buscar os dados do dashboard");
        });
    },

    loadExercisesByDay(day) {
      this.selectedDay = day;
    },
  },

  mounted() {
    const daysOfWeek = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    const currentDate = new Date();
    const dayIndex = currentDate.getDay();
    this.currentDay = daysOfWeek[dayIndex];

    this.loadWorkoutsData();
  },
};
</script>

<style scoped>
.day-button {
  min-width: 0;
}
.workout-details {
  display: flex;
  justify-content: space-between;
  margin-right: 5px;
}
</style>
