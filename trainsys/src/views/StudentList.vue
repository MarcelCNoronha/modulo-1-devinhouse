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
    <v-btn to="/cadastrar-aluno" color="primary">
      Novo
    </v-btn>
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
                <v-btn @click="filtrarAlunos" color="primary">
                  Buscar
                </v-btn>
              </v-col>
            </v-row>
            <v-data-table :headers="headers" :items="alunosFiltrados" item-key="id">
              <template v-slot:item.name="{ item }">
                {{ item.name }}
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn @click="redirecionarMontarTreino(item.id)" color="primary">
                  Montar Treino
                </v-btn>
                <v-btn @click="redirecionarCadastroAluno" color="primary">
                  Cadastrar Aluno
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
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
      alunos: [],
      busca: "",
      headers: [
        {
          text: 'Nome',
          value: 'name'
        },
        {
          text: 'Ações',
          value: 'actions'
        }
      ]
    };
  },
  computed: {
    alunosFiltrados() {
      const termoBusca = this.busca.trim().toLowerCase();
      return this.alunos.filter((aluno) => {
        return aluno.name.toLowerCase().includes(termoBusca);
      });
    }
  },
  methods: {
    carregarAlunos() {
      axios.get('/api/listar-alunos')
        .then((response) => {
          this.alunos = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    redirecionarMontarTreino(id) {
      this.$router.push({ path: `/montar-treino/${id}` });
    },
    redirecionarCadastroAluno() {
      this.$router.push('/cadastrar-aluno');
    },
    filtrarAlunos() {
      const termoBusca = this.busca.trim().toLowerCase();
      this.alunosFiltrados = this.alunos.filter((aluno) => {
        return aluno.name.toLowerCase().includes(termoBusca);
      });
    },
  },
  created() {
    this.carregarAlunos();
  },
};
</script>