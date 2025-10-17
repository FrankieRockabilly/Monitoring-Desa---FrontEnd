import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   plugins: [react()],
   server: {
      host: "0.0.0.0", // Agar dapat diakses dari perangkat lain
      port: 5173, // Pastikan port-nya 5173 (default Vite)
      historyApiFallback: true,
   },
});

