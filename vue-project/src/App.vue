<template>
  <div id="app-container">
    <header class="app-header">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15H12.01M12 12H12.01M12 9H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"></path></svg>
      <h1>Dashboard de Gestión</h1>
    </header>

    <main class="main-content">
      <UsuarioList />
      <ClienteList />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClienteList from "./components/ClienteList.vue";
import UsuarioList from "./components/UsuarioList.vue";

export default defineComponent({
  name: "App",
  components: { ClienteList, UsuarioList },
});
</script>

<style>
/* Estilos Globales */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --clr-background: #f8fafc;
  --clr-foreground: #ffffff;
  --clr-primary: #4f46e5;
  --clr-primary-hover: #4338ca;
  --clr-text-primary: #1e293b;
  --clr-text-secondary: #64748b;
  --clr-border: #e2e8f0;
  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--clr-background);
  color: var(--clr-text-primary);
}

#app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
}

.app-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--clr-primary);
  width: 100%;
  max-width: 1200px;
}

.app-header h1 {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--clr-text-primary);
}

.main-content {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}
</style>

