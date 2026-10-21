import { render } from "preact-render-to-string";
import html from "./html.tsx";
import { results } from "./results.ts";

const page = render(html);

export default {
  async fetch(request, env) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD" },
      });
    }

    const { pathname } = new URL(request.url);
    const head = request.method === "HEAD";

    if (pathname === "/") {
      return new Response(head ? null : page, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    if (pathname === "/results.json") {
      return new Response(head ? null : JSON.stringify(results), {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    }

    const asset = await env.ASSETS.fetch(request);
    const response = new Response(asset.body, asset);
    if (response.ok) {
      response.headers.set(
        "Cache-Control",
        "public, max-age=31536000, immutable",
      );
    }
    return response;
  },
} satisfies ExportedHandler<Env>;
