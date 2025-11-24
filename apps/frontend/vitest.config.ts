import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
    test: {
        environment: 'nuxt',
        environmentOptions: {
            nuxt: {
                domEnvironment: 'happy-dom',
                mock: {
                    intersectionObserver: true,
                    indexedDb: true
                }
            }
        },
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                '.nuxt/',
                'dist/',
                '**/*.config.{js,ts}',
                '**/*.d.ts'
            ]
        },
        globals: true,
        setupFiles: ['./test/setup.ts'],
        pool: 'threads',
        onConsoleLog: (log) => {
            // Suppress specific Nuxt warnings in tests
            if (log.includes('transformMode') || log.includes('localstorage-file') || log.includes('Suspense')) {
                return false
            }
        }
    }
})