import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          react: ['react', 'react-dom', 'react-router-dom'],
          
          // Redux ecosystem
          redux: ['@reduxjs/toolkit', 'react-redux'],
          
          // Radix UI components
          radix: [
            '@radix-ui/react-accordion',
            '@radix-ui/react-avatar',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip'
          ],
          
          // Form handling
          forms: ['react-hook-form', '@hookform/resolvers', 'joi'],
          
          // Utilities
          utils: [
            'axios', 
            'class-variance-authority', 
            'clsx', 
            'copy-to-clipboard',
            'lucide-react',
            'next-themes',
            'tailwind-merge'
          ],
          
          // UI enhancements
          ui: [
            'slick-carousel',
            'sonner',
            'react-web-share',
            'tailwindcss-animate'
          ]
        }
      }
    }
  }
});


