/// <reference types="vite/client" />

// --- ESTAS SON LAS LÍNEAS CLAVE ---
// Le dices a TypeScript que cualquier archivo que termine en .vue
// es un componente de Vue válido y defines su tipo.
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}