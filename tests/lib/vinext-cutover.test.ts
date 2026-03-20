import { describe, expect, it } from 'vitest';
import {
  buildVinextCutoverRewrites,
  getVinextBlockedRoutes,
  getVinextCutoverManifest,
  getVinextCutoverOrigin,
  getVinextCutoverScope,
  getVinextOwnedRoutes,
} from '@/lib/platform/vinext-cutover';

describe('vinext cutover helpers', () => {
  it('defaults cutover scope to off', () => {
    expect(getVinextCutoverScope(undefined)).toBe('off');
    expect(getVinextOwnedRoutes('off')).toEqual([]);
  });

  it('returns pilot routes for pilot scope', () => {
    expect(getVinextOwnedRoutes('pilot')).toEqual(['/news', '/help', '/guides']);
  });

  it('returns pilot and second-wave routes for wave2 scope', () => {
    expect(getVinextOwnedRoutes('wave2')).toEqual([
      '/news',
      '/help',
      '/guides',
      '/profile',
      '/absences',
      '/pvp',
      '/schedule',
      '/calendar',
    ]);
  });

  it('keeps all scope rewrites on parity-ready routes only', () => {
    expect(getVinextOwnedRoutes('all')).toEqual([
      '/news',
      '/help',
      '/guides',
      '/profile',
      '/absences',
      '/pvp',
      '/schedule',
      '/calendar',
    ]);
  });

  it('exposes blocked final-scope routes in the parity manifest', () => {
    expect(getVinextBlockedRoutes('all')).toEqual([
      '/',
      '/about',
      '/analytics',
      '/workflow',
      '/integrations',
    ]);

    const parityRoutes = getVinextCutoverManifest().map((entry) => entry.route);
    expect(parityRoutes).toEqual([
      '/',
      '/about',
      '/news',
      '/help',
      '/guides',
      '/profile',
      '/absences',
      '/pvp',
      '/schedule',
      '/calendar',
      '/analytics',
      '/workflow',
      '/integrations',
    ]);
  });

  it('normalizes vinext cutover origin', () => {
    expect(getVinextCutoverOrigin('http://127.0.0.1:3101/')).toBe('http://127.0.0.1:3101');
    expect(getVinextCutoverOrigin('')).toBeNull();
  });

  it('builds rewrites only when origin exists', () => {
    expect(buildVinextCutoverRewrites({ scope: 'pilot', origin: null })).toEqual([]);

    expect(buildVinextCutoverRewrites({ scope: 'pilot', origin: 'http://127.0.0.1:3101' })).toEqual([
      { source: '/news', destination: 'http://127.0.0.1:3101/news' },
      { source: '/news/:path*', destination: 'http://127.0.0.1:3101/news/:path*' },
      { source: '/help', destination: 'http://127.0.0.1:3101/help' },
      { source: '/help/:path*', destination: 'http://127.0.0.1:3101/help/:path*' },
      { source: '/guides', destination: 'http://127.0.0.1:3101/guides' },
      { source: '/guides/:path*', destination: 'http://127.0.0.1:3101/guides/:path*' },
      { source: '/:path((?:@).*)', destination: 'http://127.0.0.1:3101/:path' },
      { source: '/node_modules/:path*', destination: 'http://127.0.0.1:3101/node_modules/:path*' },
    ]);
  });

  it('adds vinext dev asset rewrites for all scope', () => {
    const rewrites = buildVinextCutoverRewrites({ scope: 'all', origin: 'http://127.0.0.1:3101' });
    expect(rewrites).toEqual(
      expect.arrayContaining([
        { source: '/:path((?:@).*)', destination: 'http://127.0.0.1:3101/:path' },
        { source: '/node_modules/:path*', destination: 'http://127.0.0.1:3101/node_modules/:path*' },
      ])
    );
  });
});
