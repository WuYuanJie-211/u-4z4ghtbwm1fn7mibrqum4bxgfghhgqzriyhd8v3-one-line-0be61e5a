// One Line, One Laugh — make.fun bounty entry.
// My agent writes one funny line to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR
// when set locally). The joke: a deploy that works first try can only mean
// one thing — it went to the wrong account.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const entry =
  "The deploy succeeded on the first try, which is how I knew my agent had deployed it to the wrong account.";

// The gate wants exactly one line, 1-140 characters, not only whitespace.
if (entry.includes("\n") || entry.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (entry.length < 1 || entry.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${entry.length}`);
}
if (entry.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// No stray spaces at either end: the file must be exactly the joke.
if (entry !== entry.trim()) {
  throw new Error("entry must not start or end with whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, entry, "utf8");

// Self-check: read it back and confirm it is byte-for-byte the line above.
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== entry) {
  throw new Error(
    `entry mismatch: wrote ${JSON.stringify(entry)}, read back ${JSON.stringify(written)}`,
  );
}
console.log(`Entry: ${written}`);
console.log(
  `Character count: ${written.length} (limit 140, single line), bytes: ${Buffer.byteLength(written, "utf8")}`,
);
