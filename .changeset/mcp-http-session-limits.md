---
"@inkeep/open-knowledge": patch
"@inkeep/open-knowledge-server": patch
---

MCP HTTP servers now read `OK_MCP_MAX_SESSIONS` and `OK_MCP_SESSION_TTL_MS`, so the 100-session cap and the 30-minute idle TTL can be changed without patching the server. The MCP reference documents the cap, the TTL, and `DELETE /mcp` for releasing a session early.
