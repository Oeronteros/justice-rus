import {
  buildVinextCutoverRewrites,
  getVinextCutoverOrigin,
  getVinextCutoverScope,
  getVinextOwnedRoutes,
} from '../lib/platform/vinext-cutover.ts';

const scope = getVinextCutoverScope();
const origin = getVinextCutoverOrigin();
const ownedRoutes = getVinextOwnedRoutes(scope);
const rewrites = buildVinextCutoverRewrites({ scope, origin });

process.stdout.write(`VINEXT_CUTOVER_SCOPE=${scope}\n`);
process.stdout.write(`VINEXT_CUTOVER_ORIGIN=${origin ?? ''}\n`);
process.stdout.write(`OWNED_ROUTES=${ownedRoutes.join(',')}\n`);
process.stdout.write(`REWRITE_COUNT=${rewrites.length}\n`);

for (const rewrite of rewrites) {
  process.stdout.write(`${rewrite.source} -> ${rewrite.destination}\n`);
}
