
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment';

export default defineConfig({
  plugins: [
    react(),
    // This allows process.env.API_KEY to work in the browser as required by the Gemini SDK
    EnvironmentPlugin(['API_KEY'])
  ],
  server: {
    host: true,
    port: 3000
  }
});
