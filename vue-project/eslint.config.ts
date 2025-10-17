import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

// Importamos el parser de Vue directamente
import vueParser from "vue-eslint-parser";

export default [
  // 1. Configs globales y reglas base
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  
  // 2. Configuración unificada para TODOS los archivos que usan TypeScript
  //    Esto reemplaza el "...tseslint.configs.recommended" para tener más control
  {
    // Aplicamos esto a archivos .ts y a .vue
    files: ["**/*.{ts,tsx,vue}"],

    // Extendemos las reglas recomendadas de typescript-eslint
    extends: tseslint.configs.recommended,

    // Definimos cómo se deben analizar estos archivos
    languageOptions: {
      parserOptions: {
        // Le decimos la raíz del proyecto para eliminar la ambigüedad de una vez por todas
        tsconfigRootDir: import.meta.dirname,
        project: ["./tsconfig.app.json", "./tsconfig.node.json"],
        extraFileExtensions: [".vue"],
      },
    },
  },

  // 3. SOBRESCRIBIMOS el parser solo para los archivos .vue
  //    Esto es necesario porque los .vue necesitan un tratamiento especial en su capa exterior
  {
    files: ["**/*.vue"],
    languageOptions: {
      // El parser principal para .vue es 'vue-eslint-parser'
      parser: vueParser,
      parserOptions: {
        // Y este parser usará el parser de TypeScript internamente
        // para el bloque <script lang="ts">. Las opciones de arriba se heredan.
        parser: tseslint.parser,
      },
    },
  },
];

