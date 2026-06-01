# Contributing

## How to Contribute

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/your-feature`.
3. Make focused changes following the conventions below.
4. Run validation: `node scripts/validate-starter.mjs .`.
5. Submit a pull request with the validation output.

## Adding a Workflow Doc

- Place the file in `workflows/` with a descriptive kebab-case name.
- Add a row to the routing table in `workflows/tool-routing.md`.
- Add a reference in `README.md` under the workflow map.
- If the workflow introduces a new project output document, add or update the template and validation allowlist.

## Adding a Template

- Place the file in `templates/` with an UPPER_SNAKE_CASE `.md` name.
- Add the template to `templates/README.md`.
- Reference it in `startup/02-required-project-docs.md` under fixed or conditional documents.
- Add it to the relevant `scripts/init.mjs` profile if it should be copied automatically.
- Ensure the template has meaningful structure: tables, field labels, and completion criteria, not just empty placeholders.

## Adding a Runtime Entrypoint

- Add the root instruction file if it is part of maintaining this starter.
- Add the generated-project version in `scripts/init.mjs`.
- Add a direct prompt under `prompts/` if users should be able to paste it into the runtime.
- Update `README.md`, `docs/index.md`, `VALIDATION.md`, and `scripts/validate-starter.mjs`.

## Adding an Example Fixture

- Create a subdirectory under `examples/template-adoption/`.
- Include all 7 fixed documents with realistic filled content.
- Include the conditional documents required by that project type.
- Ensure `node scripts/doctor.mjs --strict <fixture>` passes.
- Add a note in `examples/template-adoption/README.md`.

## Style Conventions

- Markdown files use ATX headings (`#`, `##`, `###`).
- Tables use pipe syntax with header separator rows.
- Cross-references use backtick-wrapped filenames.
- Public-facing docs avoid hardcoded local absolute paths.
- Do not claim external adoption without evidence.
- Do not add root numbered workflow files.
- Do not add a root `codex_mvp_prd_pack.md`; put PRD/MVP content in templates or workflow docs.
