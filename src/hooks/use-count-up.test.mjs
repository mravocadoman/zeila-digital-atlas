// Self-check for the count-up string parsing: node src/hooks/use-count-up.test.mjs
// The hook animates only the numeric part of a stat, so the parser has to keep
// prefixes ($) and suffixes (M+, x) intact. Getting this wrong silently renders
// the wrong figure, which is the one thing this page cannot afford.
import assert from "node:assert/strict";

const parse = (display) => {
  const m = display.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!m) return null;
  const [, prefix, raw, suffix] = m;
  const target = parseFloat(raw.replace(/,/g, ""));
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  return { prefix, suffix, target, decimals };
};
const frame = (p, { prefix, suffix, target, decimals }) =>
  `${prefix}${(target * (1 - Math.pow(1 - p, 3))).toFixed(decimals)}${suffix}`;

// the four stats actually on the page
assert.deepEqual(parse("10+"),   { prefix: "",  suffix: "+",  target: 10,    decimals: 0 });
assert.deepEqual(parse("$5M+"),  { prefix: "$", suffix: "M+", target: 5,     decimals: 0 });
assert.deepEqual(parse("36.34"), { prefix: "",  suffix: "",   target: 36.34, decimals: 2 });
assert.deepEqual(parse("20+"),   { prefix: "",  suffix: "+",  target: 20,    decimals: 0 });

// decimals are preserved mid-flight, not just at the end
assert.equal(frame(1, parse("36.34")), "36.34");
assert.equal(frame(0, parse("36.34")), "0.00");
assert.equal(frame(1, parse("$5M+")), "$5M+");
assert.equal(frame(0, parse("$5M+")), "$0M+");

// thousands separators shouldn't become NaN
assert.equal(parse("2,000+").target, 2000);

// non-numeric labels must be left alone rather than mangled
assert.equal(parse("Meta"), null);

console.log("use-count-up: all assertions passed");
