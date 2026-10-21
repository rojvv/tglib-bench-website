import { libraries, type Library } from "./libraries.ts";
import rawResults from "./results.json" with { type: "json" };

export type RawResults = Record<string, [number, [number, number[], ...unknown[]]]>;

// JSON imports infer arrays, while the benchmark format uses fixed tuples.
const resultsUntouched = rawResults as unknown as RawResults;

export interface Result {
  library: Library;
  date: Date;
  downloadMbs: number;
  uploadMbs: number;
}

export let results = new Array<Result>();

for (const [slug, results_] of Object.entries(resultsUntouched)) {
  const library = libraries.find((v) => v.slug == slug);
  if (!library) {
    continue;
  }
  const date = new Date(results_[0] * 1_000);
  const fileSize = results_[1][0] / 1_000 / 1_000;
  const timestamps = results_[1][1];
  if (!fileSize || !date.getTime() || timestamps.length != 4) {
    continue;
  }

  const [downloadStarted, downloadEnded, uploadStarted, uploadEnded] =
    timestamps;
  const downloadMbs = fileSize / (downloadEnded - downloadStarted);
  const uploadMbs = fileSize / (uploadEnded - uploadStarted);
  results.push({ library, date, downloadMbs, uploadMbs });
}

results = results.sort((a, b) =>
  (b.downloadMbs + b.uploadMbs) - (a.downloadMbs + a.uploadMbs)
);
