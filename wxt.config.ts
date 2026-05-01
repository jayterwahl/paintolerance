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
    content_security_policy: {
      extension_pages: "script-src 'self'; object-src 'self'",
    },
    icons,
    action: {
      default_icon: icons,
    },
  },
});
