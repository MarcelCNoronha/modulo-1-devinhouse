<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="10">
          <v-avatar size="100">
            <v-icon size="100">mdi-account-supervisor</v-icon>
          </v-avatar>
          <v-card-title class="headline">Exercícios</v-card-title>
        </v-col>
      </v-row>
  
      <v-row justify="center">
        <v-col cols="12">
          <v-card>
            <v-form>
              <v-text-field
                v-model="novoItem"
                label="Digite o nome do exercício"
              ></v-text-field>
            </v-form>
            <v-card-actions>
              <v-btn @click="adicionarItem" color="primary" class="mx-auto">
                Cadastrar
              </v-btn>
            </v-card-actions>
            <v-card-text>
              <v-data-table :headers="headers" :items="itens" item-key="id">
                <template v-slot:item.description="{ item }">
                  {{ item.description }}
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
        novoItem: "",
        itens: [],
        headers: [
          {
            text: 'Descrição',
            value: 'description'
          }
        ]
      };
    },
    methods: {
      adicionarItem() {
        if (this.novoItem.trim() !== "") {
          axios.post('/api/adicionar-exercicio', { description: this.novoItem })
            .then((response) => {
              console.log(response.data);
              this.itens.push({ description: this.novoItem });
              this.novoItem = "";
            })
            .catch((error) => {
              console.error(error);
            });
        }
      },
      carregarExercicios() {
        axios.get('/api/listar-exercicios')
          .then((response) => {
           
            this.itens = response.data;
          })
          .catch((error) => {
           
            console.error(error);
          });
      },
    },
    created() {
      this.carregarExercicios();
    },
  };
  </script>
  