import { spawn } from 'node:child_process';

const scopeArg = process.argv[2] ?? 'pilot';
const scope = ['off', 'pilot', 'wave2', 'all'].includes(scopeArg) ? scopeArg : 'pilot';
const nextPort = process.env.NEXT_PORT ?? '3000';
const vinextPort = process.env.VINEXT_PORT ?? '3101';
const vinextOrigin = process.env.VINEXT_CUTOVER_ORIGIN ?? `http://127.0.0.1:${vinextPort}`;

const isWindows = process.platform === 'win32';
const npmCommand = isWindows ? 'npm.cmd' : 'npm';
const npxCommand = isWindows ? 'npx.cmd' : 'npx';

const children = [];
let shuttingDown = false;

function forward(prefix, stream) {
  return (chunk) => {
    const text = chunk.toString();
    const lines = text.split(/\r?\n/);

    for (const line of lines) {
      if (!line) {
        continue;
      }

      stream.write(`[${prefix}] ${line}\n`);
    }
  };
}

function spawnProcess(name, command, args, env = process.env) {
  const child = spawn([command, ...args].join(' '), {
    cwd: process.cwd(),
    env,
    shell: true,
    stdio: ['inherit', 'pipe', 'pipe'],
  });

  child.stdout.on('data', forward(name, process.stdout));
  child.stderr.on('data', forward(name, process.stderr));

  child.on('exit', (code, signal) => {
    if (shuttingDown) {
      return;
    }

    const reason = signal ? `signal ${signal}` : `code ${code}`;
    process.stderr.write(`[${name}] exited with ${reason}\n`);
    shutdown(code ?? 1);
  });

  children.push(child);
  return child;
}

function shutdown(exitCode = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  for (const child of children) {
    if (child.killed) {
      continue;
    }

    child.kill('SIGTERM');
  }

  setTimeout(() => {
    for (const child of children) {
      if (!child.killed) {
        child.kill('SIGKILL');
      }
    }

    process.exit(exitCode);
  }, 2000).unref();
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

process.stdout.write(`Starting local cutover in '${scope}' mode\n`);
process.stdout.write(`- Next: http://127.0.0.1:${nextPort}\n`);
process.stdout.write(`- Vinext: ${vinextOrigin}\n`);

spawnProcess('vinext', npmCommand, ['run', 'dev:vinext'], {
  ...process.env,
  PORT: vinextPort,
});

spawnProcess('next', npxCommand, ['next', 'dev', '--port', nextPort], {
  ...process.env,
  VINEXT_CUTOVER_SCOPE: scope,
  VINEXT_CUTOVER_ORIGIN: vinextOrigin,
});
