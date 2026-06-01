# AI_SECURITY_REVIEW.md

## Scope

- RAG preview with tenant documents and citation answers.

## Prompt Injection

- External content source: uploaded documents.
- System / developer policy boundary: documents cannot override tool policy.
- Test cases: malicious document text and malicious user query.

## Data Leakage

- PII / tenant data: workspace docs.
- Secret handling: no secrets in retrieval context.
- Context minimization: only retrieved chunks enter prompt.

## Tool Side Effects

| Tool | Permission | Side effect | Human approval | Rollback |
|---|---|---|---|---|
| retrieval | read workspace chunks | none | no | n/a |
| document delete | delete document | destructive | yes | restore from backup if available |

## Tenant / Access Isolation

- User workspace must be checked before retrieval.

## Output Handling

- Shell: no shell execution from model output.
- SQL: no direct SQL from model output.
- HTML: escape cited text in UI.
- Payment / delete / publish: approval required.

## Key Lifecycle

- Owner: project owner.
- Rotation: manual before production.
- Revocation: remove provider key.
- Storage: platform env vars.

## External Actions

- None in MVP.

## Kill Switch

- Disable answer generation feature flag.

## Residual Risk

- OCR extraction quality not yet validated.
