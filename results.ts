import { libraries, Library } from "./libraries.ts";

const resultsUntouched: Record<string, [number, [number, number[]]]> = JSON
  .parse(Deno.readTextFileSync("results.json"));

interface Result {
  library: Library;
  date: Date;
  downloadMbps: number;
  uploadMbps: number;
}

export let results = new Array<Result>();

for (const [slug, results_] of Object.entries(resultsUntouched)) {
  const library = libraries.find((v) => v.slug == slug);
  if (!library) {
    continue;
  }
  const date = new Date(results_[0] * 1_000);
  const fileSize = results_[1][0] / 1_024 / 1_024;
  const timestamps = results_[1][1];
  if (!fileSize || !date.getTime() || timestamps.length != 4) {
    continue;
  }

  const [downloadStarted, downloadEnded, uploadStarted, uploadEnded] =
    timestamps;
  const downloadMbps = fileSize / (downloadEnded - downloadStarted);
  const uploadMbps = fileSize / (uploadEnded - uploadStarted);
  results.push({ library, date, downloadMbps, uploadMbps });
}

results = results.sort((a, b) =>
  (b.downloadMbps + b.uploadMbps) - (a.downloadMbps + a.uploadMbps)
);
