import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '.'),
            '@components': path.resolve(__dirname, 'components'),
            '@utils': path.resolve(__dirname, 'utils'),
            '@store': path.resolve(__dirname, 'store'),
            '@styles': path.resolve(__dirname, 'styles'),
        },
    },
});
