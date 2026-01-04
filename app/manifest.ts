import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cult | Game Community',
    short_name: 'Cult',
    description: 'Gaming community portal for Justice Mobile players',
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
