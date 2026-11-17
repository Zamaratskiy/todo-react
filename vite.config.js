import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const isProd = mode === 'production'
	return {
		base: isProd ? '/todo-react/' : '/',
		plugins: [react()],
		resolve: {
			// Включаем автоматический поиск расширений в порядке приоритета
			extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
			alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
		},
		server: {
			port: 3000 // Или любой другой свободный порт, например 5174, 8080
		}
	}
})
