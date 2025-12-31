import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Demonic Cult | Justice Mobile',
    short_name: 'Demonic Cult',
    description: 'Wuxia guild portal for the Demonic Cult community',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0f14',
    theme_color: '#8fb9cc',
    icons: [
      {
        src: '/emblem.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
