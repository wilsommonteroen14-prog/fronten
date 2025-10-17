<template>
  <!-- Tu template actual está bien, no es necesario cambiarlo -->
  <section class="management-section">
    <!-- Formulario de Clientes -->
    <div class="section-form-card">
       <h2 class="card-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-briefcase"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
        <span>Gestión de Clientes</span>
      </h2>
      <form @submit.prevent="agregarCliente" class="form">
        <div class="form-group">
          <label for="nombre-cliente">Nombre</label>
          <input id="nombre-cliente" v-model="nuevoCliente.nombre" placeholder="Ej: Juan Pérez" required />
        </div>
        <div class="form-group">
          <label for="telefono-cliente">Teléfono</label>
          <input id="telefono-cliente" v-model="nuevoCliente.telefono" placeholder="Ej: 809-123-4567" />
        </div>
         <div class="form-group">
          <label for="correo-cliente">Correo</label>
          <input id="correo-cliente" v-model="nuevoCliente.correo" type="email" placeholder="Ej: juan.perez@correo.com" />
        </div>
        <button type="submit" class="submit-button">
          Agregar Cliente
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
      </form>
    </div>
    <!-- Tabla de Clientes -->
    <div class="section-table-card">
       <h3 class="table-title">Clientes Registrados</h3>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="clientes.length === 0">
               <td colspan="4" class="empty-state">No hay clientes para mostrar.</td>
            </tr>
            <tr v-for="cliente in clientes" :key="cliente.id_cliente">
              <td>#{{ cliente.id_cliente }}</td>
              <td>{{ cliente.nombre }}</td>
              <td>{{ cliente.telefono }}</td>
              <td>{{ cliente.correo }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";

interface Cliente {
  id_cliente: number;
  nombre: string;
  telefono: string;
  correo: string;
}

export default defineComponent({
  name: "ClienteList",
  setup() {
    const clientes = ref<Cliente[]>([]);
    const nuevoCliente = ref({
      nombre: "",
      telefono: "",
      correo: "",
    });

    const cargarClientes = async () => {
      try {
        // --- VERIFICACIÓN Y CORRECCIÓN CLAVE ---
        // Asegúrate de que esta URL apunta a /api/clientes
        const res = await axios.get("https://backend-ycll.onrender.com/api/clientes");
        clientes.value = res.data;
      } catch (err) {
        console.error("Error cargando clientes:", err);
      }
    };

    const agregarCliente = async () => {
       if (!nuevoCliente.value.nombre) {
        alert("El nombre del cliente es obligatorio.");
        return;
      }
      try {
        // --- VERIFICACIÓN Y CORRECCIÓN CLAVE ---
        // Asegúrate de que esta URL apunta a /api/clientes
        const res = await axios.post(
          "https://backend-ycll.onrender.com/api/clientes",
          nuevoCliente.value
        );
        alert(res.data.mensaje);
        nuevoCliente.value = { nombre: "", telefono: "", correo: "" };
        cargarClientes();
      } catch (err) {
        console.error("Error al agregar cliente:", err);
        alert("Error al agregar cliente");
      }
    };

    onMounted(() => {
      cargarClientes();
    });

    return { clientes, nuevoCliente, agregarCliente };
  },
});
</script>

<style scoped>
/* Tus estilos actuales están bien, no es necesario cambiarlos */
.management-section {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;
  align-items: flex-start;
}
.section-form-card, .section-table-card {
  background-color: var(--clr-foreground);
  border-radius: 0.75rem;
  box-shadow: var(--shadow);
  padding: 1.5rem;
}
.card-title, .table-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--clr-text-primary);
}
.table-title {
  font-size: 1.125rem;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--clr-text-secondary);
  margin-bottom: 0.5rem;
}
.form-group input {
  padding: 0.75rem;
  border: 1px solid var(--clr-border);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.form-group input:focus {
  outline: none;
  border-color: var(--clr-primary);
  box-shadow: 0 0 0 3px #c7d2fe;
}
.submit-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--clr-primary);
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s;
}
.submit-button:hover {
  background-color: var(--clr-primary-hover);
}
.table-container {
  overflow-x: auto;
}
.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.data-table th, .data-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--clr-border);
}
.data-table th {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--clr-text-secondary);
  background-color: #f9fafb;
}
.data-table tr:last-child td {
  border-bottom: none;
}
.data-table tr:hover {
  background-color: #f9fafb;
}
.empty-state {
  text-align: center;
  color: var(--clr-text-secondary);
  padding: 2rem;
}
@media (max-width: 992px) {
  .management-section {
    grid-template-columns: 1fr;
  }
}
</style>

