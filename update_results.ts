import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { libraries } from "./libraries.ts";
import type { RawResults } from "./results.ts";

const root = fileURLToPath(new URL(".", import.meta.url));
const repository = join(root, "tglib-bench");

// Keep the full history so each library's latest result commit can be found.
if (!existsSync(repository)) {
  execFileSync("git", [
    "clone", "--branch", "main", "--single-branch",
    "https://github.com/rojvv/tglib-bench.git", repository,
  ], { stdio: "inherit" });
} else {
  execFileSync("git", ["pull", "--ff-only", "origin", "main"], {
    cwd: repository,
    stdio: "inherit",
  });
}

const results: RawResults = {};

for (const { slug: path } of libraries) {
  const timestamp = Number(
    execFileSync("git", [
      "log", "--all", "--grep=Update results", "-n", "1",
      "--pretty=format:%at", "--", path,
    ], { cwd: repository, encoding: "utf8" }).trim(),
  );

  if (!timestamp) {
    console.error("Failed to get a valid timestamp:", path);
    continue;
  }
  results[path] = [
    timestamp,
    JSON.parse(
      readFileSync(join(repository, path, "results.json"), "utf8"),
    ),
  ];
}

writeFileSync(join(root, "results.json"), JSON.stringify(results));
