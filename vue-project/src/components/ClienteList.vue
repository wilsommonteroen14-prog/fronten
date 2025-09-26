<template>
  <div>
    <h2>📋 Lista de Clientes</h2>
    <table border="1" cellpadding="8">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Correo</th>
          <th>Dirección</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.id_cliente">
          <td>{{ cliente.id_cliente }}</td>
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.telefono }}</td>
          <td>{{ cliente.correo }}</td>
          <td>{{ cliente.direccion }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "ClienteList",
  data() {
    return {
      clientes: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:4000/api/clientes")
      .then((res) => {
        this.clientes = res.data;
      })
      .catch((err) => {
        console.error("❌ Error cargando clientes:", err);
      });
  },
});
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 80%;
  margin: 20px auto;
}
th {
  background: #0077cc;
  color: white;
}
td,
th {
  padding: 8px;
  text-align: left;
}
</style>
