# Security Policy

## Scope

This repository is a starter kit for project governance documents, scripts, and agent workflow routing. It does not ship a production application or hosted service.

## Do Not Commit

- API keys, tokens, cookies, private keys, or `.env` files.
- Raw tester identifiers, personal media, face crops, embeddings, or private customer data.
- Production deployment credentials or CI secrets.
- Logs that contain private prompts, private source data, or credentials.

## Reporting

If you find a security issue in the starter scripts, templates, examples, or generated default behavior, open a private security advisory if the repository host supports it. Otherwise, contact the maintainer privately before opening a public issue.

## Expected Review Areas

- `scripts/init.mjs` must not overwrite existing project files without leaving them intact.
- `scripts/doctor.mjs` must not read secrets or print private values.
- Templates should teach projects to record secret names and ownership, not secret values.
- Examples must use placeholder data only.

## Not Covered

Security review for downstream projects generated from this starter remains the responsibility of each downstream project.
