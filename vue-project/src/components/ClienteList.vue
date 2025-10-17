<template>
  <div class="container mx-auto p-4">

    <!-- Sección del Formulario -->
    <div class="mb-10">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4 border-b-2 border-blue-500 pb-2">
        {{ enModoEdicion ? '📝 Editando Cliente' : '👤 Añadir Nuevo Cliente' }}
      </h2>
      <form @submit.prevent="manejarSubmit" class="space-y-5 bg-white p-6 rounded-lg shadow-md">

        <!-- Campo: Nombre -->
        <div>
          <label for="cliente-nombre" class="block text-sm font-medium text-gray-600 mb-1">Nombre:</label>
          <input
            id="cliente-nombre"
            v-model="nuevoCliente.nombre"
            type="text"
            required
            placeholder="Nombre completo del cliente"
            class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Campo: Teléfono -->
        <div>
          <label for="cliente-telefono" class="block text-sm font-medium text-gray-600 mb-1">Teléfono:</label>
          <input
            id="cliente-telefono"
            v-model="nuevoCliente.telefono"
            type="tel"
            placeholder="Número de teléfono"
            class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Campo: Correo -->
        <div>
          <label for="cliente-correo" class="block text-sm font-medium text-gray-600 mb-1">Correo Electrónico:</label>
          <input
            id="cliente-correo"
            v-model="nuevoCliente.correo"
            type="email"
            placeholder="ejemplo@correo.com"
            class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <!-- Campo: Dirección -->
        <div>
          <label for="cliente-direccion" class="block text-sm font-medium text-gray-600 mb-1">Dirección:</label>
          <input
            id="cliente-direccion"
            v-model="nuevoCliente.direccion"
            type="text"
            placeholder="Dirección del cliente"
            class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Botones de Acción -->
        <div class="flex space-x-4">
          <button
            type="submit"
            class="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition"
          >
            {{ enModoEdicion ? '💾 Guardar Cambios' : '➕ Agregar Cliente' }}
          </button>
          <button
            v-if="enModoEdicion"
            @click="cancelarEdicion"
            type="button"
            class="flex-grow bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>

    <!-- Sección de la Tabla -->
    <div>
      <h2 class="text-2xl font-semibold text-gray-700 mb-4 border-b-2 border-blue-500 pb-2">
        📋 Clientes Registrados
      </h2>
      <div v-if="clientes.length > 0" class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Correo</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="cliente in clientes" :key="cliente.id_cliente" class="hover:bg-gray-50">
              <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ cliente.id_cliente }}</td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ cliente.nombre }}</td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ cliente.telefono }}</td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ cliente.correo }}</td>
              <td class="px-6 py-4 text-sm font-medium space-x-2">
                 <button @click="iniciarEdicion(cliente)" class="text-blue-600 hover:text-blue-900">Editar</button>
                 <button @click="eliminarCliente(cliente.id_cliente)" class="text-red-600 hover:text-red-900">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-center bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg">
        <p>No hay clientes registrados.</p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// --- Definición de Tipos para TypeScript ---
interface Cliente {
  id_cliente: number;
  nombre: string;
  telefono?: string | null;
  correo?: string | null;
  direccion?: string | null;
}

// --- Props ---
const props = defineProps<{
  clientes: Cliente[];
  apiUrl: string;
}>();

// --- Emits ---
const emit = defineEmits(['recargar-clientes']);

// --- Estado Reactivo ---
const enModoEdicion = ref(false);
const nuevoCliente = ref({
  id_cliente: null as number | null,
  nombre: '',
  telefono: '',
  correo: '',
  direccion: ''
});

// --- Funciones ---
const limpiarFormulario = () => {
  enModoEdicion.value = false;
  nuevoCliente.value = {
    id_cliente: null,
    nombre: '',
    telefono: '',
    correo: '',
    direccion: ''
  };
};

// --- CORRECCIÓN CLAVE AQUÍ ---
const iniciarEdicion = (cliente: Cliente) => {
  enModoEdicion.value = true;
  // Al asignar los valores, nos aseguramos de que cumplan con el "Contrato Estricto".
  // Si un campo es null o undefined, le asignamos una cadena vacía ('').
  nuevoCliente.value = {
    id_cliente: cliente.id_cliente,
    nombre: cliente.nombre,
    telefono: cliente.telefono || '',
    correo: cliente.correo || '',
    direccion: cliente.direccion || '',
  };
};

const cancelarEdicion = () => {
  limpiarFormulario();
};

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
    if (!response.ok) throw new Error('Error en la respuesta del servidor');
    
    limpiarFormulario();
    emit('recargar-clientes');
  } catch (error) {
    console.error("Error al agregar cliente:", error);
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
    if (!response.ok) throw new Error('Error al actualizar');
    
    limpiarFormulario();
    emit('recargar-clientes');
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
  }
};

const eliminarCliente = async (id: number) => {
  if (!confirm('¿Estás seguro de que quieres eliminar este cliente?')) return;
  try {
    const url = `${props.apiUrl}/${id}`;
    const response = await fetch(url, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error al eliminar');
    
    emit('recargar-clientes');
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
  }
};
</script>