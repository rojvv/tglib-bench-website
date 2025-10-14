import { join } from "jsr:@std/path/join";
import { $ } from "jsr:@david/dax";
import { libraries } from "./libraries.ts";

// Get latest version of the repository
await $`git clone --branch main https://github.com/rojvv/tglib-bench.git || true`;
await $`cd tglib-bench && git pull`;

const results: Record<string, [number, [number, number[]]]> = {};

for (const { slug: path } of libraries) {
  console.log(
    await $`cd tglib-bench && git log --all --grep='Update results' -n 1 --pretty=format:'%at' -- ${
      $.path(path)
    }`
      .text(),
  );
  const timestamp = Number(
    await $`cd tglib-bench && git log --all --grep='Update results' -n 1 --pretty=format:'%at' -- ${
      $.path(path)
    }`
      .text(),
  );

  if (!timestamp) {
    console.error("Failed to get a valid timestamp:", path);
    continue;
  }
  results[path] = [
    timestamp,
    JSON.parse(
      Deno.readTextFileSync(join("tglib-bench", path, "results.json")),
    ),
  ];
}

Deno.writeTextFileSync("results.json", JSON.stringify(results));
