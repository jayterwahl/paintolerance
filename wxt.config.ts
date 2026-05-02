import { defineConfig } from 'wxt';

const icons = {
  16: '/icon-16.png',
  48: '/icon-48.png',
  128: '/icon-128.png',
};

export default defineConfig({
  manifest: {
    name: 'Pain Tolerance',
    description:
      'Simulated hostile replies on your own tweets to build up your pain tolerance for internet nonsense.',
    permissions: ['storage'],
    host_permissions: [
      'http://localhost:47831/*',
      'http://127.0.0.1:47831/*',
    ],
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
  },
});
