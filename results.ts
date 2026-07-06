import { libraries, Library } from "./libraries.ts";

const resultsUntouched: Record<string, [number, [number, number[]]]> = JSON
  .parse(Deno.readTextFileSync("results.json"));

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
