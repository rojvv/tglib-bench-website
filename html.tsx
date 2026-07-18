/** @jsxImportSource preact */
import { results } from "./results.ts";

const id = "?3";

export default (
  <html>
    <head>
      <title>tglib-bench</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href={`/normalize.css${id}`} />
      <link rel="stylesheet" href={`/main.css${id}`} />
      {/* <script src="/lib/lottie-player.js" /> */}
      <script src={`/main.js${id}`} />
      {/*<!--site_verification property must be present, but could be empty (no IVBot-side verification for now?)-->*/}
      <meta
        property="tg:site_verification"
        content="g7j8/rPFXfhyrq5q0QQV7EsYWv4="
      />
      {/*<!--published_time property must be present, but you could leave content empty if no $published_date is wanted-->*/}
      <meta property="article:published_time" content="" />
      <meta property="article:author" content="https://t.me/libspeedbot" />
      <meta property="telegram:channel" content="@tglibs" />
    </head>
    <body>
      <div class="article">
        <article class="article__content">
          <div>
            <div>
              Download and Upload Speed Comparison of Different Telegram Client
              Libraries
            </div>
          </div>
          <main>
            <table>
              <thead>
                <tr>
                  <th scope="col" class="number">
                    #
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
                      {v.downloadMbs.toFixed(1)} MB/s
                    </td>
                    <td class="number">
                      {v.uploadMbs.toFixed(1)} MB/s
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
                Each library was given a 2 GB file to download, and then
                re-upload. All benchmarks were run inside GitHub-hosted runners
                located in the United States, and connected to Telegram’s DC1
                (United States). Machine specifications: Linux x86-64 (Ubuntu
                24.04), 4-core CPU, 16 GB memory, 14 GB SSD storage.{" "}
              </span>
              <a href="https://github.com/rojvv/tglib-bench/actions/workflows/bench.yml">
                View runs.
              </a>
            </div>
          </footer>
        </article>
      </div>
    </body>
  </html>
);

function Idx({ idx }: { idx: number }) {
  if (idx) {
    return (
      <td class="idx number">
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
