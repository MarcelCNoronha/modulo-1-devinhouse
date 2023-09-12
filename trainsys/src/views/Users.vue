<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="pa-4">
            <v-form @submit.prevent="handleCreateAccount">
              <h2 class="text-center">Criar conta</h2>
  
              <v-text-field
                v-model="name"
                label="Nome completo"
                outlined
                :error-messages="errors.name"
                required
              ></v-text-field>
  
              <v-text-field
                v-model="email"
                label="Email"
                outlined
                :error-messages="errors.email"
                required
              ></v-text-field>
  
              <v-text-field
                v-model="phone"
                label="Telefone"
                outlined
                :error-messages="errors.phone"
                required
              ></v-text-field>
  
              <v-text-field
                v-model="password"
                label="Senha"
                outlined
                :error-messages="errors.password"
                required
                type="password"
              ></v-text-field>
  
              <v-text-field
                v-model="verifyPassword"
                label="Confirma senha"
                outlined
                :error-messages="errors.verifyPassword"
                required
                type="password"
              ></v-text-field>
  
              <v-select
                v-model="sponsor"
                :items="['bronze', 'silver', 'gold']"
                label="plano"
                outlined
              ></v-select>
  
              <div class="align-center">
                <v-btn type="submit" color="primary" class="mb-4 x-auto">Cadastrar</v-btn>
                <v-btn type="submit" color="white" class="mx-auto outlined primary--text">Voltar</v-btn>
              </div>
              
            </v-form>
  
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import * as yup from 'yup'
  import { captureErrorYup } from '../utils/captureErrorYup.js'
  import axios from 'axios'
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        phone: '',
        password: '',
        verifyPassword: '',
        sponsor: '',
        bio: '',
        confirmTerms: true,
        planType: '2',
  
        errors: {}
      }
    },
    methods: {
      handleCreateAccount() {
        try {
          // 1 - CRIAR SCHEMA VALIDATION
          const schema = yup.object().shape({
            name: yup.string().required('Nome é obrigatório'),
            email: yup.string().email('Email não é valido').required('Email é obrigatório'),
            phone: yup.string().required('Telefone é obrigatório'),
            password: yup
              .string()
              .min(8, 'A senha deve ser maior')
              .max(20, 'Deve ter entre 8-20 letras')
              .required('A senha é obrigatória'),
            verifyPassword: yup
              .string()
              .required('A confirmação necessária')
              .oneOf([yup.ref('password')], 'As senhas devem coincidir'),
            confirmTerms: yup.boolean().isTrue('O termo de uso deve ser aceito')
          })
  
          schema.validateSync(
            {
              name: this.name,
              email: this.email,
              phone: this.phone,
              password: this.password,
              verifyPassword: this.verifyPassword,
              confirmTerms: this.confirmTerms
            },
            { abortEarly: false } // importante
          )
  
          // Cadastro de usuario
  
          axios({
            url: 'http://localhost:3000/api/register',
            method: 'POST',
            data: {
              name: this.name,
              email: this.email,
              contact: this.phone,
              password: this.password,
              sponsor: this.sponsor,
              bio: this.bio,
              confirmTerms: this.confirmTerms,
              planType: this.planType
            }
          })
            .then(() => {
              alert('Cadastrado com sucesso')
              this.$router.push('/')
            })
            .catch((error) => {
              console.log(error)
              if(error.response?.data?.message) {
                  alert(error.response.data.message)
              } else {
                alert('Houve uma falha ao tentar cadastrar')
              }
            })
  
        } catch (error) {
          if (error instanceof yup.ValidationError) {
            console.log(error)
            // capturar os errors do yup
            this.errors = captureErrorYup(error)
          }
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .text-center {
    text-align: center;
  }
  
  .form-login {
    margin: 40px auto;
    width: 40%;
  
    border-radius: 4px;
    border: 1px solid #383737;
  
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  
    padding: 10px;
  }
  
  .form-element {
    display: flex;
    flex-direction: column;
    width: 80%;
  }
  
  .form-select,
  .form-input,
  .form-textarea {
    border-radius: 8px;
    border: 1px solid #756767;
    outline: none;
  }
  
  .form-radio {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .message-error {
    color: red;
    margin: 4px;
  }
  
  .input-error {
    border-color: red;
  }
  
  button {
    width: 80%;
    height: 54px;
    background-color: #3578e5;
  
    color: white;
    font-size: 18px;
    border-radius: 8px;
    border: none;
  }
  
  button:hover {
    background-color: #286ee0;
  }
  </style>
  