import { describe, expect, it } from 'vitest';
import {
  DEFAULT_MCP_MAX_SESSIONS,
  DEFAULT_MCP_SESSION_TTL_MS,
  mcpHttpLimitsFromEnv,
} from './mcp-http-limits.ts';

describe('mcpHttpLimitsFromEnv', () => {
  it('leaves both limits to the defaults when nothing is set', () => {
    expect(mcpHttpLimitsFromEnv({})).toEqual({
      maxSessions: undefined,
      sessionTtlMs: undefined,
    });
  });

  it('treats an empty value as unset', () => {
    expect(mcpHttpLimitsFromEnv({ OK_MCP_MAX_SESSIONS: '  ' })).toEqual({
      maxSessions: undefined,
      sessionTtlMs: undefined,
    });
  });

  it('reads both limits', () => {
    expect(
      mcpHttpLimitsFromEnv({
        OK_MCP_MAX_SESSIONS: '250',
        OK_MCP_SESSION_TTL_MS: '60000',
      }),
    ).toEqual({ maxSessions: 250, sessionTtlMs: 60000 });
  });

  it.each(['0', '-1', '1.5', 'many', '1e3'])('rejects %s as a session cap', (value) => {
    expect(() => mcpHttpLimitsFromEnv({ OK_MCP_MAX_SESSIONS: value })).toThrow(
      /OK_MCP_MAX_SESSIONS must be a positive integer/,
    );
  });

  it.each(['0', '-1', '1.5', 'many'])('rejects %s as a session TTL', (value) => {
    expect(() => mcpHttpLimitsFromEnv({ OK_MCP_SESSION_TTL_MS: value })).toThrow(
      /OK_MCP_SESSION_TTL_MS must be a positive integer/,
    );
  });

  it('keeps the documented defaults', () => {
    expect(DEFAULT_MCP_MAX_SESSIONS).toBe(100);
    expect(DEFAULT_MCP_SESSION_TTL_MS).toBe(30 * 60 * 1000);
  });
});
