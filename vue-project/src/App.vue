<template>
  <div class="app-container">
    <header class="app-header">
      <h1 class="app-title">Dashboard de Gestión</h1>
    </header>
    
    <main class="main-content">
      <!-- Sección de Usuarios -->
      <UsuarioList 
        :usuarios="usuarios" 
        :api-url="USUARIOS_API_URL"
        @recargar-usuarios="cargarUsuarios"
        @mostrar-modal="mostrarModal"
      />

      <!-- Sección de Clientes -->
      <ClienteList 
        :clientes="clientes" 
        :api-url="CLIENTES_API_URL"
        @recargar-clientes="cargarClientes"
        @mostrar-modal="mostrarModal"
      />

      <!-- Modal Global (sin cambios de diseño) -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showModal = false">
        <div class="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center" @click.stop>
          <h3 class="text-xl font-bold text-gray-800 mb-4">{{ modalTitle }}</h3>
          <p class="text-gray-600 mb-6">{{ modalMessage }}</p>
          <button @click="showModal = false" :class="modalVariant === 'success' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'" class="w-full text-white py-2 rounded-lg transition">
            Entendido
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// --- SIN CAMBIOS EN LA LÓGICA ---
// Todo el script se mantiene exactamente igual que en la versión anterior.
import { ref, onMounted } from 'vue';
import UsuarioList from './components/UsuarioList.vue';
import ClienteList from './components/ClienteList.vue';

interface Usuario { id_usuario: number; nombre: string; correo: string; rol: string; }
interface Cliente { id_cliente: number; nombre: string; telefono?: string | null; correo?: string | null; direccion?: string | null; }

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4001';
const USUARIOS_API_URL = `${API_BASE_URL}/api/usuarios`;
const CLIENTES_API_URL = `${API_BASE_URL}/api/clientes`;

const usuarios = ref<Usuario[]>([]);
const clientes = ref<Cliente[]>([]);
const showModal = ref(false);
const modalTitle = ref('');
const modalMessage = ref('');
const modalVariant = ref('success');

const mostrarModal = (title: string, message: string, variant = 'success') => {
  modalTitle.value = title;
  modalMessage.value = message;
  modalVariant.value = variant;
  showModal.value = true;
};

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

onMounted(() => {
  cargarUsuarios();
  cargarClientes();
});
</script>

<style>
/* --- ESTILOS GLOBALES Y REDISEÑO --- */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  --clr-background: #f3f4f6; /* Gris claro de fondo */
  --clr-foreground: #ffffff; /* Blanco para las tarjetas */
  --clr-primary: #3b82f6; /* Azul primario */
  --clr-primary-hover: #2563eb; /* Azul más oscuro para hover */
  --clr-text-primary: #1f2937; /* Texto principal oscuro */
  --clr-text-secondary: #6b7280; /* Texto secundario gris */
  --clr-border: #e5e7eb; /* Borde sutil */
  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--clr-background);
  color: var(--clr-text-primary);
}

.app-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.app-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.app-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--clr-text-primary);
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

/* Estilos compartidos para las secciones */
.management-section {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 2rem;
  align-items: flex-start;
}

.section-form-card,
.section-table-card {
  background-color: var(--clr-foreground);
  border-radius: 0.75rem;
  box-shadow: var(--shadow);
  padding: 1.75rem;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--clr-text-primary);
  border-bottom: 1px solid var(--clr-border);
  padding-bottom: 1rem;
}

/* Estilos del Formulario */
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

.submit-button, .cancel-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  margin-top: 1rem;
}

.submit-button {
  background-color: var(--clr-primary);
}
.submit-button:hover {
  background-color: var(--clr-primary-hover);
  transform: translateY(-2px);
}

.cancel-button {
  background-color: var(--clr-text-secondary);
}
.cancel-button:hover {
  background-color: #4b5563;
  transform: translateY(-2px);
}

/* Estilos de la Tabla */
.table-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--clr-text-primary);
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
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--clr-border);
  vertical-align: middle;
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
  padding: 2.5rem;
  font-style: italic;
}
.rol-badge {
  display: inline-block;
  background-color: #e0e7ff;
  color: #4338ca;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
}
.action-buttons button {
  font-weight: 600;
  transition: color 0.2s;
}

/* Responsive */
@media (max-width: 992px) {
  .management-section {
    grid-template-columns: 1fr;
  }
}
</style>

