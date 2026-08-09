import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const CONTROL_ROOT = 'benchmarks/external-oss-v8/control/loop';
const taskGraph = JSON.parse(readFileSync(`${CONTROL_ROOT}/task-graph.json`, 'utf8'));
const loopState = JSON.parse(readFileSync(`${CONTROL_ROOT}/loop-state.json`, 'utf8'));
const ledgerEntries = readFileSync(`${CONTROL_ROOT}/run-ledger.jsonl`, 'utf8')
  .trim()
  .split('\n')
  .map((line) => JSON.parse(line));
const decisionLog = readFileSync(`${CONTROL_ROOT}/decision-log.md`, 'utf8');
const humanGates = readFileSync(`${CONTROL_ROOT}/human-gates.md`, 'utf8');
const terminationReport = readFileSync('benchmarks/external-oss-effectiveness-r2/termination-report.md', 'utf8');
const termination = JSON.parse(
  readFileSync(`${CONTROL_ROOT}/reconciliation/issue-92-effect-r2-termination.json`, 'utf8'),
);
const identityResolution = JSON.parse(
  readFileSync(`${CONTROL_ROOT}/reconciliation/issue-84-comment-5186392861.json`, 'utf8'),
);

const requiredNodeFields = [
  'nodeId',
  'phase',
  'objective',
  'dependencies',
  'entryCriteria',
  'acceptanceCriteria',
  'validationCommands',
  'evidencePaths',
  'humanGate',
  'status',
  'blockerCode',
  'attempts',
  'activeIssue',
  'activePR',
  'lastVerifiedMainSha',
  'weightPercent',
];
const allowedStatuses = new Set([
  'PASS',
  'IN_PROGRESS',
  'PENDING',
  'BLOCKED',
  'INDETERMINATE',
  'EVIDENCE_CONFLICT',
  'PARTIAL',
  'FAIL',
  'HUMAN_GATE',
  'EXTERNAL_PENDING',
  'SUPERSEDED',
  'INELIGIBLE',
]);
const requiredCanonicalNodes = {
  P0: ['P0.1', 'P0.2', 'P0.3', 'P0.4'],
  P1: ['P1.1', 'P1.2', 'P1.3', 'P1.4', 'P1.5'],
  P2: ['P2.1', 'P2.2', 'P2.3', 'P2.4', 'P2.5', 'P2.6'],
  P3: ['P3.1', 'P3.2', 'P3.3', 'P3.4', 'P3.5', 'P3.6', 'P3.7', 'P3.8', 'P3.9'],
  P4: ['P4.1', 'P4.2', 'P4.3', 'P4.4', 'P4.5', 'P4.6'],
  P5: ['P5.1', 'P5.2', 'P5.3', 'P5.4', 'P5.5', 'P5.6'],
  P6: ['P6.1', 'P6.2', 'P6.3', 'P6.4'],
  P7: ['P7.1', 'P7.2', 'P7.3', 'P7.4', 'P7.5', 'P7.6'],
  P8: ['P8.1', 'P8.2', 'P8.3', 'P8.4', 'P8.5'],
};
const canonicalIds = new Set(Object.values(requiredCanonicalNodes).flat());
const expectedG2Runs = [31014045209, 31032816504, 31258029890, 31263886864, 31288483975];
const expectedArtifacts = [8935651599, 8941397535, 9021973989, 9023562032, 9030614871];
const expectedDigests = [
  'sha256:567ca3d9e79d72da8c69508b686f85ea0baabdf61d860495001478f5f12777be',
  'sha256:6aec10269a8914befdb889c028b1e32d4ecfe204be282ae055f52367a6b04c85',
  'sha256:ca2a85c1c21d54a28247d52856aa130c8e880a0710bc290b3cc32442bb8a42bd',
  'sha256:5af585c9decc2ea07433e80a776676ec1059bce9068e911a992cc7e3dc938b1c',
  'sha256:a90e7b7cf9624a6ab0091810c016493fc8bb31eb6ff07717c9d9b49494033bcd',
];

function validateControl(graph, state) {
  const errors = [];
  const nodes = new Map(graph.nodes.map((node) => [node.nodeId, node]));
  for (const node of graph.nodes) {
    for (const field of requiredNodeFields) {
      if (!Object.hasOwn(node, field)) errors.push(`${node.nodeId} missing ${field}`);
    }
    if (!allowedStatuses.has(node.status)) errors.push(`${node.nodeId} invalid status ${node.status}`);
    if (!Array.isArray(node.dependencies)) errors.push(`${node.nodeId} dependencies must be an array`);
    if (!Array.isArray(node.entryCriteria)) errors.push(`${node.nodeId} entryCriteria must be an array`);
    if (!Array.isArray(node.acceptanceCriteria)) errors.push(`${node.nodeId} acceptanceCriteria must be an array`);
    if (!Array.isArray(node.validationCommands)) errors.push(`${node.nodeId} validationCommands must be an array`);
    if (!Array.isArray(node.evidencePaths)) errors.push(`${node.nodeId} evidencePaths must be an array`);
  }
  for (const node of graph.nodes.filter((candidate) => candidate.status === 'PASS')) {
    for (const dependencyId of node.dependencies) {
      const dependency = nodes.get(dependencyId);
      if (!dependency) errors.push(`${node.nodeId} has unknown dependency ${dependencyId}`);
      else if (dependency.status !== 'PASS') errors.push(`${node.nodeId} falsely passes with ${dependencyId}=${dependency.status}`);
    }
  }
  const calculated = graph.nodes
    .filter((node) => canonicalIds.has(node.nodeId) && node.status === 'PASS')
    .reduce((sum, node) => sum + node.weightPercent, 0);
  if (Number(calculated.toFixed(10)) !== state.completionPercentage) {
    errors.push(`completion mismatch: calculated=${calculated} recorded=${state.completionPercentage}`);
  }
  return errors;
}

test('task graph remains closed and recalculates exactly 33 percent', () => {
  assert.equal(taskGraph.schemaVersion, 1);
  assert.equal(taskGraph.benchmarkId, 'GS-OSS-2026-08-02-V8');
  assert.equal(taskGraph.authoritativeMainSha, '4c8442b2b9e9af29fb7755dd6470c92442cbec24');
  assert.equal(taskGraph.authoritativeMainTreeSha, 'eaf23456d3d16fc50276844db22dfff3f17d6ebf');
  const nodeIds = new Set(taskGraph.nodes.map((node) => node.nodeId));
  for (const [phase, ids] of Object.entries(requiredCanonicalNodes)) {
    assert.equal(taskGraph.phaseWeightsPercent[phase] > 0, true, `missing weight for ${phase}`);
    for (const id of ids) assert.equal(nodeIds.has(id), true, `missing canonical node ${id}`);
  }
  assert.deepEqual(validateControl(taskGraph, loopState), []);
  const calculated = taskGraph.nodes
    .filter((node) => canonicalIds.has(node.nodeId) && node.status === 'PASS')
    .reduce((sum, node) => sum + node.weightPercent, 0);
  assert.equal(Number(calculated.toFixed(10)), 33);
  assert.equal(loopState.completionPercentage, 33);
  assert.equal(taskGraph.nodes.find((node) => node.nodeId === 'P1.4').status, 'PASS');
  assert.equal(taskGraph.nodes.find((node) => node.nodeId === 'P3.7').status, 'FAIL');
});

test('termination makes every downstream experiment node not run and ineligible', () => {
  assert.equal(taskGraph.termination.status, 'TERMINATED_AT_G2_FAIL');
  assert.equal(taskGraph.termination.zeroAdditionalProviderSpend, true);
  assert.equal(taskGraph.termination.weightedCompletionPercent, 33);
  assert.equal(taskGraph.termination.effectivenessConclusion, 'INCONCLUSIVE');
  for (const value of Object.values(taskGraph.termination.stageDisposition).slice(1)) {
    assert.equal(value, 'NOT_RUN_INELIGIBLE');
  }
  for (const node of taskGraph.nodes.filter((candidate) => /^P[4-8]\./.test(candidate.nodeId))) {
    assert.equal(node.status, 'INELIGIBLE', node.nodeId);
    assert.equal(node.blockerCode, 'NOT_RUN_EXPERIMENT_TERMINATED_AT_G2_FAIL', node.nodeId);
  }
  assert.equal(taskGraph.nodes.find((node) => node.nodeId === 'P1.5').status, 'INELIGIBLE');
  assert.equal(taskGraph.nodes.find((node) => node.nodeId === 'P3.8').status, 'INELIGIBLE');
  assert.equal(taskGraph.nodes.find((node) => node.nodeId === 'P3.9').status, 'INELIGIBLE');
});

test('owner termination and five immutable G2 failures are exact', () => {
  assert.equal(termination.ownerTermination.authorAssociation, 'OWNER');
  assert.equal(termination.ownerTermination.commentId, 5229210405);
  assert.equal(
    termination.ownerTermination.bodySha256,
    'f884861b202aa76d6ae736df30f1785fcad83063b67ab8ce70be69711987830d',
  );
  assert.equal(termination.ownerTermination.zeroAdditionalProviderSpend, true);
  assert.equal(termination.g2.status, 'FAIL');
  assert.equal(termination.g2.successfulRuntimeIdentityArtifacts, 0);
  assert.deepEqual(termination.g2.runs.map((run) => run.runId), expectedG2Runs);
  assert.deepEqual(termination.g2.runs.map((run) => run.artifactId), expectedArtifacts);
  assert.deepEqual(termination.g2.runs.map((run) => run.artifactDigest), expectedDigests);
  assert.deepEqual(
    termination.g2.runs.filter((run) => run.explicitlyNamedByTermination).map((run) => run.runId),
    [31014045209, 31032816504, 31258029890, 31288483975],
  );
  const retained = termination.g2.runs.find((run) => run.runId === 31263886864);
  assert.equal(retained.explicitlyNamedByTermination, false);
  assert.match(retained.retentionReason, /cannot be deleted or omitted/i);
});

test('P1.4 merge evidence supports the final 33 percent without claiming G2', () => {
  const merge = termination.p1_4MergeReconciliation;
  assert.equal(merge.pullRequest, 89);
  assert.equal(merge.reviewedHeadSha, 'e162c71f47c11bb9eb745f6eb463cd9652e2c615');
  assert.equal(merge.reviewedTreeSha, merge.mergeCommitTreeSha);
  assert.equal(merge.independentAcceptCommentId, 5190958937);
  assert.equal(merge.ownerApprovalCommentId, 5191111222);
  assert.equal(Date.parse(merge.ownerApprovalCreatedAt) < Date.parse(merge.mergedAt), true);
  assert.equal(merge.mergeCommitSha, '8f7edae19bb2c29ae2deacef07ae2734d1d61b3f');
  assert.equal(merge.exactHeadCiRun, 30997044086);
  assert.deepEqual(merge.ciPlatforms, { ubuntu: 'SUCCESS', macos: 'SUCCESS', windows: 'SUCCESS' });
  assert.equal(merge.gateDecision, 'P1.4_PASS');
});

test('loop state has no ready node, active run, spending authority, or acceptance claim', () => {
  assert.equal(loopState.activePhase, 'TERMINATED');
  assert.equal(loopState.activeNode, null);
  assert.deepEqual(loopState.activeRunIds, []);
  assert.deepEqual(loopState.readySetAtSelection, []);
  assert.deepEqual(loopState.nextReadyNodes, []);
  assert.equal(loopState.currentHumanGate, 'NONE_EXPERIMENT_TERMINATED');
  assert.equal(loopState.termination.G2, 'FAIL');
  assert.equal(loopState.termination.G3, 'NOT_RUN_INELIGIBLE');
  assert.equal(loopState.termination.Pilot, 'NOT_RUN_INELIGIBLE');
  assert.equal(loopState.termination.confirmatory, 'NOT_RUN_INELIGIBLE');
  assert.equal(loopState.termination.scoring, 'NOT_RUN_INELIGIBLE');
  assert.equal(loopState.termination.independentEffectivenessReview, 'NOT_RUN_INELIGIBLE');
  assert.equal(loopState.termination.finalAcceptance, 'NOT_RUN_INELIGIBLE');
  assert.equal(loopState.accounting.providerUsageValue, 'UNKNOWN');
  assert.equal(loopState.accounting.creditsOrGrantsApplied, 'UNKNOWN');
  assert.equal(loopState.accounting.actualOutOfPocketCashCharged, 'UNKNOWN');
  assert.equal(loopState.accounting.additionalProviderSpendAuthorizedUsd, 0);
  assert.equal(loopState.thisCycleProviderRequests, 0);
  assert.equal(loopState.workflowDispatch, 'NOT_RUN_IN_TERMINATION_RECONCILIATION');
  assert.match(loopState.claimBoundary, /no claim that GovernSeed improves effectiveness/i);
});

test('termination cycle is append-only, zero-provider, and final for this graph', () => {
  const finalCycle = ledgerEntries.at(-1);
  assert.equal(finalCycle.cycleId, 'GS-LOOP-2026-08-09-C022');
  assert.equal(finalCycle.selectedNode, 'TERMINATION_RECONCILIATION');
  assert.equal(finalCycle.providerRequests, 'NOT_RUN_ZERO_ADDITIONAL_PROVIDER_SPEND');
  assert.equal(finalCycle.workflowDispatch, 'NOT_RUN_ZERO_ADDITIONAL_PROVIDER_SPEND');
  assert.equal(finalCycle.nextState, 'TERMINATED_AT_G2_FAIL_NO_READY_NODE');
  assert.equal(finalCycle.validation.weightedCompletion, 'PASS_33_PERCENT');
  assert.match(decisionLog, /R2 terminated at G2 FAIL/);
  assert.match(humanGates, /ZERO_ADDITIONAL_PROVIDER_SPEND=true/);
  assert.match(humanGates, /no claim that GovernSeed improves effectiveness/i);
  assert.match(terminationReport, /Effectiveness conclusion: `INCONCLUSIVE`/);
  assert.match(terminationReport, /No baseline or GovernSeed experiment arm ran/);
});

test('R2 identity resolution remains preserved and cannot pool R1 evidence', () => {
  assert.equal(identityResolution.taskIdentityResolution.createdExperimentId, 'GS-OSS-2026-08-05-EFFECT-R2');
  assert.equal(identityResolution.taskIdentityResolution.poolEvidenceAcrossRevisions, false);
  assert.equal(identityResolution.taskIdentityResolution.status, 'RESOLVED_BY_OWNER_NEW_REVISION');
});

test('validator catches invalid status, false PASS dependency, and completion inflation', async (t) => {
  await t.test('invalid status', () => {
    const graph = structuredClone(taskGraph);
    graph.nodes[0].status = 'READYISH';
    assert.match(validateControl(graph, loopState).join('\n'), /invalid status READYISH/);
  });
  await t.test('false PASS dependency', () => {
    const graph = structuredClone(taskGraph);
    graph.nodes.find((node) => node.nodeId === 'P1.4').status = 'PASS';
    graph.nodes.find((node) => node.nodeId === 'P1.2').status = 'BLOCKED';
    assert.match(validateControl(graph, loopState).join('\n'), /P1\.4 falsely passes with P1\.2=BLOCKED/);
  });
  await t.test('completion inflation', () => {
    const state = structuredClone(loopState);
    state.completionPercentage = 34;
    assert.match(validateControl(taskGraph, state).join('\n'), /completion mismatch/);
  });
});
