<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
    <div class="w-full max-w-6xl space-y-10">
      
      <!-- Sección de Usuarios -->
      <div class="bg-white p-6 md:p-10 rounded-2xl shadow-lg">
        <UsuarioList 
          :usuarios="usuarios" 
          :api-url="USUARIOS_API_URL"
          @recargar-usuarios="cargarUsuarios"
          @mostrar-modal="mostrarModal"
        />
      </div>

      <!-- Sección de Clientes -->
      <div class="bg-white p-6 md:p-10 rounded-2xl shadow-lg">
        <ClienteList 
          :clientes="clientes" 
          :api-url="CLIENTES_API_URL"
          @recargar-clientes="cargarClientes"
          @mostrar-modal="mostrarModal"
        />
      </div>

      <!-- Modal Global -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showModal = false">
        <div class="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center" @click.stop>
          <h3 class="text-xl font-bold text-gray-800 mb-4">{{ modalTitle }}</h3>
          <p class="text-gray-600 mb-6">{{ modalMessage }}</p>
          <button @click="showModal = false" :class="modalVariant === 'success' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'" class="w-full text-white py-2 rounded-lg transition">
            Entendido
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import UsuarioList from './components/UsuarioList.vue';
import ClienteList from './components/ClienteList.vue';

// --- Definición de Tipos ---
interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
  rol: string;
}

interface Cliente {
  id_cliente: number;
  nombre: string;
  telefono?: string | null;
  correo?: string | null;
  direccion?: string | null;
}

// --- URLs de la API (Lectura Profesional) ---
// 1. Lee la variable de entorno de Vercel.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4001';

// 2. Construye las URLs completas a partir de la base.
const USUARIOS_API_URL = `${API_BASE_URL}/api/usuarios`;
const CLIENTES_API_URL = `${API_BASE_URL}/api/clientes`;

// --- Estado Reactivo ---
const usuarios = ref<Usuario[]>([]);
const clientes = ref<Cliente[]>([]);
const showModal = ref(false);
const modalTitle = ref('');
const modalMessage = ref('');
const modalVariant = ref('success');

// --- Funciones del Modal ---
const mostrarModal = (title: string, message: string, variant = 'success') => {
  modalTitle.value = title;
  modalMessage.value = message;
  modalVariant.value = variant;
  showModal.value = true;
};

// --- Lógica para Cargar Datos ---
const cargarUsuarios = async () => {
  try {
    const res = await fetch(USUARIOS_API_URL);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    usuarios.value = await res.json() as Usuario[];
  } catch (error: unknown) {
    let message = 'Ocurrió un error desconocido.';
    if (error instanceof Error) message = error.message;
    mostrarModal('❌ Error de Conexión', `No se pudo cargar la lista de usuarios. ${message}`, 'error');
  }
};

const cargarClientes = async () => {
  try {
    const res = await fetch(CLIENTES_API_URL);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    clientes.value = await res.json() as Cliente[];
  } catch (error: unknown) {
    let message = 'Ocurrió un error desconocido.';
    if (error instanceof Error) message = error.message;
    mostrarModal('❌ Error de Conexión', `No se pudo cargar la lista de clientes. ${message}`, 'error');
  }
};

// --- Carga Inicial ---
onMounted(() => {
  cargarUsuarios();
  cargarClientes();
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
body {
  font-family: 'Inter', sans-serif;
}
</style>