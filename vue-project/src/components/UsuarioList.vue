<template>
  <section class="management-section">
    <div class="section-form-card">
      <h2 class="card-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        <span>Gestión de Usuarios</span>
      </h2>
      <form @submit.prevent="agregarUsuario" class="form">
        <div class="form-group">
          <label for="nombre-usuario">Nombre</label>
          <input id="nombre-usuario" v-model="nuevoUsuario.nombre" placeholder="Ej: Ana García" required />
        </div>
        <div class="form-group">
          <label for="correo-usuario">Correo Electrónico</label>
          <input id="correo-usuario" v-model="nuevoUsuario.correo" placeholder="Ej: ana.garcia@correo.com" type="email" required />
        </div>
        <div class="form-group">
          <label for="rol-usuario">Rol</label>
          <input id="rol-usuario" v-model="nuevoUsuario.rol" placeholder="Ej: Administrador" required />
        </div>
        <button type="submit" class="submit-button">
          Agregar Usuario
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
        </button>
      </form>
    </div>

    <div class="section-table-card">
      <h3 class="table-title">Usuarios Registrados</h3>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="usuarios.length === 0">
              <td colspan="4" class="empty-state">No hay usuarios registrados.</td>
            </tr>
            <tr v-for="usuario in usuarios" :key="usuario.id_usuario">
              <td>#{{ usuario.id_usuario }}</td>
              <td>{{ usuario.nombre }}</td>
              <td>{{ usuario.correo }}</td>
              <td><span class="rol-badge">{{ usuario.rol }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
  rol: string;
}

const props = defineProps<{
  usuarios: Usuario[];
  apiUrl: string;
}>();

const emit = defineEmits(['recargar-usuarios', 'mostrar-modal']);

const nuevoUsuario = ref({
  nombre: '',
  correo: '',
  rol: ''
});

const agregarUsuario = async () => {
  try {
    const response = await fetch(props.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario.value),
    });

    if (!response.ok) {
      // --- CORRECCIÓN CLAVE AQUÍ ---
      // Le aseguramos a TypeScript que el objeto de error tendrá una propiedad 'message' opcional.
      const errorData = await response.json() as { message?: string };
      throw new Error(errorData.message || `Error del servidor: ${response.status}`);
    }
    
    nuevoUsuario.value = { nombre: '', correo: '', rol: '' };
    emit('mostrar-modal', '✅ Éxito', 'El usuario fue agregado correctamente.');
    emit('recargar-usuarios');

  } catch (error: any) {
    console.error("Error al agregar usuario:", error);
    emit('mostrar-modal', '❌ Error', `No se pudo agregar el usuario. ${error.message}`, 'error');
  }
};
</script>

<style scoped>
/* Tus estilos están bien, los puedes dejar como estaban */
.management-section { display: grid; grid-template-columns: 350px 1fr; gap: 2rem; align-items: flex-start; }
.section-form-card, .section-table-card { background-color: white; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); padding: 1.5rem; }
.card-title { display: flex; align-items: center; gap: 0.75rem; font-size: 1.25rem; font-weight: 600; margin-bottom: 1.5rem; color: #1f2937; }
.form { display: flex; flex-direction: column; gap: 1rem; }
.form-group { display: flex; flex-direction: column; }
.form-group label { font-size: 0.875rem; font-weight: 500; color: #4b5563; margin-bottom: 0.5rem; }
.form-group input { padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 1rem; }
.form-group input:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px #bfdbfe; }
.submit-button { display: flex; justify-content: center; align-items: center; gap: 0.5rem; background-color: #2563eb; color: white; padding: 0.75rem; border: none; border-radius: 0.5rem; font-size: 1rem; font-weight: 600; cursor: pointer; margin-top: 1rem; }
.submit-button:hover { background-color: #1d4ed8; }
.table-title { font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem; }
.table-container { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; text-align: left; }
.data-table th, .data-table td { padding: 0.75rem 1rem; border-bottom: 1px solid #e5e7eb; }
.data-table th { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; background-color: #f9fafb; }
.data-table tr:last-child td { border-bottom: none; }
.data-table tr:hover { background-color: #f9fafb; }
.empty-state { text-align: center; color: #6b7280; padding: 2rem; }
.rol-badge { display: inline-block; background-color: #e0e7ff; color: #3730a3; padding: 0.25rem 0.625rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500; }
@media (max-width: 992px) { .management-section { grid-template-columns: 1fr; } }
</style>