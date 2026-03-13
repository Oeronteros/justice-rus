# Security Notes

## Current Security Defaults

- Authentication uses `httpOnly` cookies for account sessions.
- Sensitive write endpoints reject cross-origin requests via explicit same-origin checks.
- DB-backed session resolution validates account id shape before querying `portal_account`, so malformed/test fixture ids fail safely instead of surfacing Postgres type errors.
- Production responses include hardened baseline headers from `next.config.ts`, including `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`, and `Strict-Transport-Security`.
- Auth endpoints apply rate limiting and origin checks before issuing cookies.

## Trust Boundaries

- The web app remains a portal/proxy layer in front of the Discord Bot API and database.
- Browser writes that depend on session cookies must originate from the same site.
- External bot or proxy data should be treated as untrusted until validated at the app boundary.

## Legacy PIN Access

- Officer/Head/Sysadmin PIN login exists as fallback access, not the primary authentication path.
- The preferred path is nickname + password with an activatable account.
- Keep PIN secrets rotated and scoped to emergency or compatibility usage.
- Avoid expanding PIN-based access to new flows when account-based access can be used instead.

## Validation Path

Run the full verification gate before merge:

```bash
npm run validate
```
