// The Word You'd Delete From the Dictionary
//
// This program writes a single word to /output/entry.txt: the one word the
// entrant would erase from the dictionary forever.
//
// The word is "queue".
//
// Why queue? Five letters, one sound. It is the most pointlessly spelled word
// in English: a lone "q" dragging four silent letters behind it like a tail
// (fittingly, it comes from the Latin "cauda", tail). Delete it and two jokes
// land at once: the dictionary loses its silliest spelling, and nobody ever
// has to stand in one again. Every reader recognises it instantly, the humour
// is in the word itself, and it is not the pick the rest of the field reaches
// for first.

import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const WORD = "queue";

// The gate requires UTF-8 text of 1 to 77 characters, not only whitespace.
// Fail loudly instead of writing an entry that can never be judged.
if (WORD.length < 1 || WORD.length > 77 || WORD.trim().length === 0) {
  throw new Error(`word ${JSON.stringify(WORD)} fails the 1-77 char gate`);
}

// The harness provides MAKEFUN_OUTPUT_DIR ("/output" in the grading
// sandbox). An empty value is treated as unset, so a stray empty variable
// can never redirect the write to the current working directory.
const rawDir = process.env.MAKEFUN_OUTPUT_DIR;
const outputDir = resolve(rawDir && rawDir.trim() !== "" ? rawDir : "/output");
mkdirSync(outputDir, { recursive: true });

// Exactly the word, byte for byte: no trailing newline, no extra text.
writeFileSync(join(outputDir, "entry.txt"), WORD, "utf8");
