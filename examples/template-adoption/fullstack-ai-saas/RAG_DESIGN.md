# RAG_DESIGN.md

## Sources

| Source | Format | Owner | Update frequency | Access boundary |
|---|---|---|---|---|
| Customer docs | PDF / Markdown | workspace owner | manual upload | workspace only |

## Ingestion

- Parser: project-selected parser.
- Retry / failure handling: mark document failed with reason.
- Deduplication: checksum by workspace.
- Metadata: workspace id, document id, chunk id, source anchor.

## Chunking

- Strategy: section-aware chunks.
- Chunk size: define in implementation spec.
- Parent / child relation: document -> section -> chunk.
- Citation anchor: document title and section offset.

## Retrieval

- Method: hybrid.
- Top-k: start with 5.
- Rerank: optional after preview.
- Permission filter before retrieval: workspace id.

## Answering

- Citation requirement: every factual answer cites chunks.
- Low-confidence fallback: say not enough source evidence.
- Cannot-answer rule: do not infer from outside workspace docs.

## Evaluation

- Retrieval recall: golden questions.
- Faithfulness: answer only from cited chunks.
- Answer relevance: manual spot-check.
- Citation correctness: cited chunk supports answer.

## Monitoring

- Missed retrieval: log query and expected source.
- Hallucination reports: manual issue.
- Cost / latency: record p95 in preview.
- Data drift: manual re-ingestion.

## Open Questions

- OCR requirement remains open.
