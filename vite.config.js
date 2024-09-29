import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://3.109.212.132:8080",
      changeOrigin: true,
      secure: false,
    },
  },
});

// vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/user': {
//         target: 'https://3.109.212.132:8080', // Use HTTPS to avoid mixed content
//         changeOrigin: true,
//         secure: false, // If the target uses a self-signed certificate
//       },
//     },
//   },
// });
