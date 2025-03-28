import { render } from "preact-render-to-string";
import { Application } from "@oak/oak/application";
import { Router } from "@oak/oak/router";
import html from "./html.tsx";
import { Status } from "jsr:@oak/commons@1/status";

const router = new Router();
router.use(async (ctx, next) => {
  if (ctx.request.url.hostname.endsWith("deno.dev")) {
    ctx.response.redirect("https://libspeed.telegram.tools");
    return;
  }
  if (ctx.request.method != "GET") {
    ctx.response.status = Status.MethodNotAllowed;
  } else {
    await next();
  }
});

router.get("/", (ctx) => {
  ctx.response.body = render(html);
});

const app = new Application();

app.use(router.routes());

app.use(async (ctx) => {
  await ctx.send({
    root: `${Deno.cwd()}/static`,
  });
  ctx.response.headers.set(
    "cache-control",
    "public, max-age=31536000, immutable",
  );
});

app.listen({ port: 3000 });
