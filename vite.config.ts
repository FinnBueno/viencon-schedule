import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig, loadEnv, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  // Reads VITE_APP_VERSION from the real environment as well as .env files,
  // so CI can inject the release tag without a `process` global here.
  const env = loadEnv(mode, '.', 'VITE_');

  return {
    plugins: [
      react(),
      mkcert(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.png', 'apple-touch-icon.png'],
        devOptions: {
          enabled: true,
        },
        manifest: {
          id: '/viencon-schedule/',
          name: 'Viencon Schedule',
          short_name: 'Viencon',
          description: 'Event schedule for Viencon',
          theme_color: '#314149',
          background_color: '#314149',
          display: 'standalone',
          display_override: ['standalone'],
          orientation: 'portrait',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'maskable-icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
          handle_links: 'preferred',
          launch_handler: {
            client_mode: 'navigate-existing',
          },
        },
      }),
      sentryVitePlugin({
        org: 'finn-7k',
        project: 'javascript-react',
        // this release name is used to tag sourcemaps
        release: { name: env.VITE_APP_VERSION },
        telemetry: false,
      }),
    ],

    base: '/viencon-schedule/',

    build: {
      sourcemap: true,
    },
  };
});
