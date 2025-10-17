<template>
  <section class="management-section">
    <!-- Formulario -->
    <div class="section-form-card">
      <h2 class="card-title">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        <span>{{ enModoEdicion ? 'Editando Cliente' : 'Gestión de Clientes' }}</span>
      </h2>
      <form @submit.prevent="manejarSubmit" class="form">
        <div class="form-group">
          <label for="cliente-nombre">Nombre</label>
          <input id="cliente-nombre" v-model="nuevoCliente.nombre" placeholder="Nombre completo del cliente" required />
        </div>
        <div class="form-group">
          <label for="cliente-telefono">Teléfono</label>
          <input id="cliente-telefono" v-model="nuevoCliente.telefono" placeholder="Número de teléfono" />
        </div>
        <div class="form-group">
          <label for="cliente-correo">Correo Electrónico</label>
          <input id="cliente-correo" v-model="nuevoCliente.correo" placeholder="ejemplo@correo.com" type="email" />
        </div>
        <div class="form-group">
          <label for="cliente-direccion">Dirección</label>
          <input id="cliente-direccion" v-model="nuevoCliente.direccion" placeholder="Dirección del cliente" />
        </div>
        <div class="flex space-x-4">
          <button type="submit" class="submit-button flex-grow">
            {{ enModoEdicion ? 'Guardar Cambios' : 'Agregar Cliente' }}
          </button>
          <button v-if="enModoEdicion" @click="cancelarEdicion" type="button" class="cancel-button flex-grow">
            Cancelar
          </button>
        </div>
      </form>
    </div>

    <!-- Tabla -->
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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="clientes.length === 0">
              <td colspan="5" class="empty-state">No hay clientes para mostrar.</td>
            </tr>
            <tr v-for="cliente in clientes" :key="cliente.id_cliente">
              <td class="font-medium">#{{ cliente.id_cliente }}</td>
              <td>{{ cliente.nombre }}</td>
              <td>{{ cliente.telefono }}</td>
              <td>{{ cliente.correo }}</td>
              <td class="action-buttons space-x-4">
                <button @click="iniciarEdicion(cliente)" class="text-blue-600 hover:text-blue-800">Editar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// --- SIN CAMBIOS EN LA LÓGICA ---
// Todo el script se mantiene exactamente igual que en la versión anterior.
import { ref } from 'vue';

interface Cliente { id_cliente: number; nombre: string; telefono?: string | null; correo?: string | null; direccion?: string | null; }

const props = defineProps<{ clientes: Cliente[]; apiUrl: string; }>();
const emit = defineEmits(['recargar-clientes', 'mostrar-modal']);

const enModoEdicion = ref(false);
const nuevoCliente = ref({ id_cliente: null as number | null, nombre: '', telefono: '', correo: '', direccion: '' });

const limpiarFormulario = () => {
  enModoEdicion.value = false;
  nuevoCliente.value = { id_cliente: null, nombre: '', telefono: '', correo: '', direccion: '' };
};

const iniciarEdicion = (cliente: Cliente) => {
  enModoEdicion.value = true;
  nuevoCliente.value = {
    id_cliente: cliente.id_cliente,
    nombre: cliente.nombre,
    telefono: cliente.telefono || '',
    correo: cliente.correo || '',
    direccion: cliente.direccion || '',
  };
};

const cancelarEdicion = () => { limpiarFormulario(); };

const manejarSubmit = () => {
  if (enModoEdicion.value) {
    actualizarCliente();
  } else {
    agregarCliente();
  }
};

const agregarCliente = async () => {
  try {
    const response = await fetch(props.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoCliente.value),
    });
    if (!response.ok) {
        const errorData = await response.json() as { message?: string };
        throw new Error(errorData.message || `Error del servidor: ${response.status}`);
    }
    limpiarFormulario();
    emit('mostrar-modal', '✅ Éxito', 'El cliente fue agregado correctamente.');
    emit('recargar-clientes');
  } catch (error: any) {
    console.error("Error al agregar cliente:", error);
    emit('mostrar-modal', '❌ Error', `No se pudo agregar el cliente. ${error.message}`, 'error');
  }
};

const actualizarCliente = async () => {
  if (!nuevoCliente.value.id_cliente) return;
  try {
    const url = `${props.apiUrl}/${nuevoCliente.value.id_cliente}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoCliente.value),
    });
    if (!response.ok) {
        const errorData = await response.json() as { message?: string };
        throw new Error(errorData.message || `Error al actualizar: ${response.status}`);
    }
    limpiarFormulario();
    emit('mostrar-modal', '✅ Éxito', 'El cliente fue actualizado correctamente.');
    emit('recargar-clientes');
  } catch (error: any) {
    console.error("Error al actualizar cliente:", error);
    emit('mostrar-modal', '❌ Error', `No se pudo actualizar el cliente. ${error.message}`, 'error');
  }
};
</script>

<style scoped>
/* No se necesitan estilos aquí, todo se maneja desde App.vue */
</style>
