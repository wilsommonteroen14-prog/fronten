<template>
  <div id="app">
    <h1>🚀 Frontend con Vue + Backend (Clientes)</h1>
    <ClienteList />
  </div>
</template>

<script lang="ts">
import ClienteList from './components/ClienteList.vue';

export default {
  name: 'App',
  components: {
    ClienteList
  }
}
</script>
