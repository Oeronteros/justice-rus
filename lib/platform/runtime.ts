type RuntimeEnv = {
  runtime?: string;
  vercel?: string;
};

export function isVinextRuntime(runtime = process.env.NEXT_PUBLIC_RUNTIME) {
  return runtime === 'vinext';
}

export function isNextRuntime(runtime = process.env.NEXT_PUBLIC_RUNTIME) {
  return !isVinextRuntime(runtime);
}

export function shouldEnableTelemetry(env: RuntimeEnv = {}) {
  const runtime = env.runtime ?? process.env.NEXT_PUBLIC_RUNTIME;
  const vercel = env.vercel ?? process.env.VERCEL;

  return vercel === '1' && isNextRuntime(runtime);
}

export function isWorkflowAutomationEnabled(
  value = process.env.NEXT_PUBLIC_WORKFLOW_AUTOMATION_ENABLED
) {
  return value === '1' || value === 'true';
}
