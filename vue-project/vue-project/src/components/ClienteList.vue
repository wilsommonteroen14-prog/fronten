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
import { defineComponent, type PropType } from "vue"; // 👈 nota el "type" aquí

// 💡 Definición del tipo Cliente
interface Cliente {
  id_cliente: number;
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
}

export default defineComponent({
  name: "ClienteList",
  props: {
    clientes: {
      type: Array as PropType<Cliente[]>, // 👈 usa el tipo correctamente
      required: true,
    },
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
