import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
// ESM 호환 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default defineConfig({
    plugins: [react()],
    publicDir: 'public',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, '.'),
            '@components': resolve(__dirname, 'components'),
            '@utils': resolve(__dirname, 'utils'),
            '@store': resolve(__dirname, 'store'),
            '@styles': resolve(__dirname, 'styles'),
        },
    },
});
