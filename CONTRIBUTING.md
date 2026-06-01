# Contributing

## How to Contribute

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/your-feature`.
3. Make your changes following the conventions below.
4. Run validation: `node scripts/validate-starter.mjs .`
5. Submit a pull request.

## Adding a Workflow Doc

- Place the file in `workflows/` with a descriptive kebab-case name.
- Add a row to the routing table in `workflows/tool-routing.md`.
- Add a reference in `README.md` under the File Map.
- Ensure `validate-starter.mjs` still passes.

## Adding a Template

- Place the file in `templates/` with an UPPER_SNAKE_CASE `.md` name.
- Add the template to `templates/README.md`.
- Reference it in `startup/02-required-project-docs.md` under fixed or conditional documents.
- Ensure the template has meaningful structure—tables, field labels, and completion criteria—not just empty placeholders.

## Adding an Example Fixture

- Create a subdirectory under `examples/template-adoption/`.
- Include all 7 fixed documents filled with realistic content.
- Add a note in `examples/template-adoption/README.md`.

## Style Conventions

- Markdown files use ATX headings (`#`, `##`, `###`).
- Tables use pipe syntax with header separator rows.
- All cross-references use backtick-wrapped filenames.
- No hardcoded absolute paths—use relative paths from the project root.
