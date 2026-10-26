export const DEFAULT_MCP_MAX_SESSIONS = 100;
export const DEFAULT_MCP_SESSION_TTL_MS = 30 * 60 * 1000;

const MAX_SESSIONS_ENV = 'OK_MCP_MAX_SESSIONS';
const SESSION_TTL_ENV = 'OK_MCP_SESSION_TTL_MS';

export interface McpHttpLimits {
  maxSessions?: number;
  sessionTtlMs?: number;
}

function positiveIntegerEnv(name: string, env: NodeJS.ProcessEnv): number | undefined {
  const raw = env[name];
  if (raw === undefined) return undefined;
  const trimmed = raw.trim();
  if (trimmed === '') return undefined;
  if (!/^\d+$/.test(trimmed)) {
    throw new Error(`${name} must be a positive integer, got ${JSON.stringify(raw)}`);
  }
  const value = Number.parseInt(trimmed, 10);
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer, got ${JSON.stringify(raw)}`);
  }
  return value;
}

export function mcpHttpLimitsFromEnv(env: NodeJS.ProcessEnv = process.env): McpHttpLimits {
  return {
    maxSessions: positiveIntegerEnv(MAX_SESSIONS_ENV, env),
    sessionTtlMs: positiveIntegerEnv(SESSION_TTL_ENV, env),
  };
}
