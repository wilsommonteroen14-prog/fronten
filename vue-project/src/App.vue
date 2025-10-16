<template>
  <div id="app">
    <h1>🚀 Frontend con Vue + Backend (Clientes)</h1>
    <ClienteList :clientes="clientes" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import ClienteList from "./components/ClienteList.vue";

interface Cliente {
  id_cliente: number;
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
}

export default defineComponent({
  name: "App",
  components: { ClienteList },
  data() {
    return {
      clientes: [] as Cliente[],
    };
  },
  mounted() {
    axios
      .get<Cliente[]>("http://localhost:4000/api/clientes")
      .then((res) => {
        this.clientes = res.data;
      })
      .catch((err) => {
        console.error("❌ Error cargando clientes:", err);
      });
  },
});
</script>
