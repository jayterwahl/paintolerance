import { defineConfig } from 'wxt';

const icons = {
  16: '/icon-16.png',
  48: '/icon-48.png',
  128: '/icon-128.png',
};

// Localhost host permission is only required for the dev-only QA receiver
// (scripts/visual-qa/receiver.mjs). Production builds ship without it so
// users never see "this extension can talk to localhost" at install time.
const QA_HOST_PERMISSIONS = [
  'http://localhost:47831/*',
  'http://127.0.0.1:47831/*',
];

export default defineConfig({
  manifest: ({ mode }) => {
    const isDev = mode !== 'production';
    return {
      name: 'Pain Tolerance',
      description:
        'Simulated hostile replies on your own tweets to build up your pain tolerance for internet nonsense.',
      permissions: ['storage'],
      ...(isDev && { host_permissions: QA_HOST_PERMISSIONS }),
      content_security_policy: {
        extension_pages: "script-src 'self'; object-src 'self'",
      },
      web_accessible_resources: [
        {
          matches: ['*://twitter.com/*', '*://x.com/*'],
          resources: ['/avatar-pool/*'],
        },
      ],
      icons,
      action: {
        default_icon: icons,
      },
    };
  },
});
