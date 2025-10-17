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

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";

interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
  rol: string;
}

export default defineComponent({
  name: "UsuarioList",
  setup() {
    const usuarios = ref<Usuario[]>([]);
    const nuevoUsuario = ref<Omit<Usuario, "id_usuario">>({
      nombre: "",
      correo: "",
      rol: "",
    });

    const cargarUsuarios = async () => {
      try {
        const res = await axios.get("https://backend-ycll.onrender.com/api/usuarios")
        usuarios.value = res.data;
      } catch (err) {
        console.error("Error cargando usuarios:", err);
      }
    };

    const agregarUsuario = async () => {
      if (!nuevoUsuario.value.nombre || !nuevoUsuario.value.correo || !nuevoUsuario.value.rol) {
        alert("Por favor llena todos los campos");
        return;
      }
      try {
        const res = await axios.post(
         "https://backend-ycll.onrender.com/api/usuarios",
          nuevoUsuario.value
        );
        alert(res.data.mensaje);
        nuevoUsuario.value = { nombre: "", correo: "", rol: "" };
        cargarUsuarios();
      } catch (err) {
        console.error(err);
        alert("Error al agregar usuario");
      }
    };

    onMounted(() => cargarUsuarios());

    return { usuarios, nuevoUsuario, agregarUsuario };
  },
});
</script>

<style scoped>
/* Estilos compartidos para las secciones */
.management-section {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;
  align-items: flex-start;
}

.section-form-card,
.section-table-card {
  background-color: var(--clr-foreground);
  border-radius: 0.75rem;
  box-shadow: var(--shadow);
  padding: 1.5rem;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--clr-text-primary);
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
  transition: background-color 0.2s;
  margin-top: 1rem;
}

.submit-button:hover {
  background-color: var(--clr-primary-hover);
}

/* Estilos de la Tabla */
.table-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
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
.rol-badge {
  display: inline-block;
  background-color: #e0e7ff;
  color: #3730a3;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 992px) {
  .management-section {
    grid-template-columns: 1fr;
  }
}
</style>

