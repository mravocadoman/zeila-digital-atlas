// Self-check: node src/lib/apply-core.test.ts
// The /apply page routes by monthly ad spend before asking anything else, so nobody fills in ten questions
// only to learn the offer was never for them.
import assert from "node:assert/strict";
import { QUESTIONS, SPEND_BANDS, routeFor } from "./apply-core.ts";

assert.equal(routeFor("under-10k"), "resources");
assert.equal(routeFor("10k-20k"), "audit");
assert.equal(routeFor("20k-50k"), "call");
assert.equal(routeFor("50k-plus"), "call");

assert.ok(QUESTIONS.length <= 10, "ten questions or fewer");
assert.equal(QUESTIONS[0].id, "spend", "spend comes first");
assert.deepEqual(QUESTIONS[0].options?.map((o) => o.value), [...SPEND_BANDS]);
for (const q of QUESTIONS) if (q.kind === "select") assert.ok(q.options && q.options.length > 1, `${q.id} has options`);
assert.equal(new Set(QUESTIONS.map((q) => q.id)).size, QUESTIONS.length, "ids are unique");

console.log("apply-core: ok");
