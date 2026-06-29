/** @jsxImportSource preact */
import { results } from "./results.ts";

const id = "?3";

export default (
  <html>
    <head>
      <title>tglib-bench</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href={`/fonts.css${id}`} />
      <link rel="stylesheet" href={`/normalize.css${id}`} />
      <link rel="stylesheet" href={`/main.css${id}`} />
      {/* <script src="/lib/lottie-player.js" /> */}
      <script src={`/main.js${id}`} />
    </head>
    <body>
      <div>
        <div>
          Download and Upload Speed Comparison of Different Telegram Client
          Libraries
        </div>
        <div></div>
      </div>
      <main>
        <table>
          <thead>
            <tr>
              <th scope="col" class="number">
                <span class="null">0</span>#
              </th>
              <th scope="col">Library</th>
              <th scope="col">Download</th>
              <th scope="col">Upload</th>
              <th scope="col">Date</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {results.map((v, i) => (
              <tr>
                <Idx idx={i + 1} />
                <td>
                  <a href={v.library.link}>{v.library.name}</a>
                </td>
                <td class="number">
                  <span class="null">{v.downloadMbps < 10 && "0"}</span>
                  {v.downloadMbps.toFixed(1)} MB/s
                </td>
                <td class="number">
                  <span class="null">{v.uploadMbps < 10 && "0"}</span>
                  {v.uploadMbps.toFixed(1)} MB/s
                </td>
                <td class="number">
                  {new Intl.DateTimeFormat().format(v.date)}
                </td>
                <td>
                  <a
                    href={`https://github.com/rojvv/tglib-bench/tree/main/${v.library.slug}`}
                  >
                    View Source
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <footer>
        <div>
          <span>
            Each library was given a 2 GB file to download, and then re-upload.
            All benchmarks were run inside GitHub-hosted runners located in the
            United States, and connected to Telegram’s DC1 (United States).
            Machine specifications: Linux x86-64 (Ubuntu 24.04), 4-core CPU, 16
            GB memory, 14 GB SSD storage.{" "}
          </span>
          <a href="https://github.com/rojvv/tglib-bench/actions/workflows/bench.yml">
            View runs.
          </a>
        </div>
      </footer>
    </body>
  </html>
);

function Idx({ idx }: { idx: number }) {
  if (idx) {
    return (
      <td class="idx number">
        <span class="null">{idx < 10 && "0"}</span>
        {idx}.
      </td>
    );
  } else {
    return (
      <td
        dangerouslySetInnerHTML={{
          __html: `
<lottie-player
  autoplay
  loop
  mode="normal"
  src="/animations/${idx}.json"
  style="width: 24px"
>
</lottie-player>`,
        }}
      />
    );
  }
}
