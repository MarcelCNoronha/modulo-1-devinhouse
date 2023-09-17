<template>
  <v-app>
    <Header v-if="mostrarHeader" />
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  computed: {
    mostrarHeader() {
      const rotasSemHeader = ["/", "/cadastro-usuario"];
      return !rotasSemHeader.includes(this.$route.path);
    },
  },
};
</script>
