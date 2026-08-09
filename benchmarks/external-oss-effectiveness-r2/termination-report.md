# GS-OSS-2026-08-05-EFFECT-R2 termination report

Status: `TERMINATED_AT_G2_FAIL`.

The repository OWNER terminated revision 2 on 2026-08-09 after every fresh G2 runtime-identity canary failed without producing a successful provider receipt. The final observed G2 failure was HTTP 429 with deterministic classification `RATE_LIMIT_OR_QUOTA`. No successful runtime-identity artifact exists.

## Final disposition

| Stage | Result |
| --- | --- |
| G2 | `FAIL` |
| G3 | `NOT_RUN / INELIGIBLE` |
| Pilot | `NOT_RUN / INELIGIBLE` |
| Confirmatory | `NOT_RUN / INELIGIBLE` |
| Scoring | `NOT_RUN / INELIGIBLE` |
| Independent effectiveness review | `NOT_RUN / INELIGIBLE` |
| Final acceptance | `NOT_RUN / INELIGIBLE` |

Weighted completion is `33%`. Only canonical PASS nodes contribute to that value. The experiment did not reach formal lock, either experiment arm, scoring, an effectiveness review, or acceptance.

## Immutable G2 evidence

The OWNER explicitly named runs `31014045209`, `31032816504`, `31258029890`, and `31288483975` for preservation. Run `31263886864` is also retained because it was already part of the append-only evidence history and cannot be silently omitted.

The exact run, artifact, digest, failure-file hash, and GitHub receipt bindings are recorded in `benchmarks/external-oss-v8/control/loop/reconciliation/issue-92-effect-r2-termination.json`. The canonical OWNER termination is [Issue #92 comment 5229210405](https://github.com/Eskasia/governseed/issues/92#issuecomment-5229210405), exact API-body SHA-256 `f884861b202aa76d6ae736df30f1785fcad83063b67ab8ce70be69711987830d`.

## Accounting

- Conservative governance reservation: USD 11.
- Experiment accounting ceiling: USD 350.
- Provider usage value: `UNKNOWN`.
- Credits or grants applied: `UNKNOWN`.
- Actual out-of-pocket cash charged: `UNKNOWN`.
- Additional provider spend after termination: zero authorized and zero performed.

The conservative reservation is an internal fail-closed accounting value. It is not evidence of provider usage value or actual cash charged.

## Conclusion and claim boundary

Effectiveness conclusion: `INCONCLUSIVE`.

No baseline or GovernSeed experiment arm ran. No score or effect size was calculated. This termination therefore supports no claim that GovernSeed improves effectiveness. The pre-execution contract, task identities, runtime diagnostics, and control evidence remain useful only as governance and failure-analysis evidence.
