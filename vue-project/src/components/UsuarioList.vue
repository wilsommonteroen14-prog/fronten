<template>
  <section class="management-section">
    <!-- Formulario -->
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

    <!-- Tabla -->
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
              <td colspan="4" class="empty-state">No hay usuarios para mostrar.</td>
            </tr>
            <tr v-for="usuario in usuarios" :key="usuario.id_usuario">
              <td class="font-medium">#{{ usuario.id_usuario }}</td>
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
// --- SIN CAMBIOS EN LA LÓGICA ---
// Todo el script se mantiene exactamente igual que en la versión anterior.
import { ref } from 'vue';

interface Usuario { id_usuario: number; nombre: string; correo: string; rol: string; }

const props = defineProps<{ usuarios: Usuario[]; apiUrl: string; }>();
const emit = defineEmits(['recargar-usuarios', 'mostrar-modal']);

const nuevoUsuario = ref({ nombre: '', correo: '', rol: '' });

const agregarUsuario = async () => {
  try {
    const response = await fetch(props.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario.value),
    });
    if (!response.ok) {
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
/* No se necesitan estilos aquí, todo se maneja desde App.vue */
</style>
