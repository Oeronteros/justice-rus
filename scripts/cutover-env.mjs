const modeArg = process.argv[2] ?? 'pilot';
const mode = ['off', 'pilot', 'wave2', 'all'].includes(modeArg) ? modeArg : 'pilot';
const originArg = process.argv[3];
const fallbackOrigin = process.env.VINEXT_CUTOVER_ORIGIN ?? 'https://vinext-preview.example.com';
const origin = mode === 'off' ? '' : (originArg || fallbackOrigin).replace(/\/$/, '');

const lines = [
  `VINEXT_CUTOVER_SCOPE=${mode}`,
  `VINEXT_CUTOVER_ORIGIN=${origin}`,
];

process.stdout.write(lines.join('\n') + '\n');
