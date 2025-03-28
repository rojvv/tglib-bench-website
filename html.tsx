/** @jsxImportSource preact */
import { results } from "./results.ts";

export default (
  <html>
    <head>
      <title>tglib-bench</title>
      <meta name="viewport" content="width=device-width" />
      <link rel="stylesheet" href="/fonts.css" />
      <link rel="stylesheet" href="/main.css" />
      {/* <script src="/lib/lottie-player.js" /> */}
      <script src="/main.js" />
    </head>
    <body>
      <header>
        <div>
          Download and Upload Speed Comparison of Different Telegram Client
          Libraries
        </div>
        <div></div>
      </header>
      <main>
        <div>
          <span style="opacity: 0">0</span>#
        </div>
        <div>Library</div>
        <div>Download</div>
        <div>Upload</div>
        <div>Date</div>
        <div></div>
        {results.map((v, i) => (
          <>
            <Idx idx={i + 1} />
            <div>
              <a href={v.library.link}>{v.library.name}</a>
            </div>
            <div>{v.downloadMbps.toFixed(1)} MB/s</div>
            <div>{v.uploadMbps.toFixed(1)} MB/s</div>
            <div>{new Intl.DateTimeFormat().format(v.date)}</div>
            <div>
              <a
                href={`https://github.com/rojvv/tglib-bench/tree/main/${v.library.slug}`}
              >
                View Source
              </a>
            </div>
          </>
        ))}
      </main>
      <footer>
        <div>
          <span>
            Each library was given a 2 GB file to download, and then re-upload.
            All benchmarks were run inside GitHub-hosted runners located in the
            United States, and connected to Telegram’s DC1 (United States).
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
      <div>
        <span style="opacity: 0">{idx < 10 && "0"}</span>
        {idx}.
      </div>
    );
  } else {
    return (
      <div
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
