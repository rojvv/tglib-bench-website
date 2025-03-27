import { render } from "preact-render-to-string";
import { Application } from "@oak/oak/application";
import { Router } from "@oak/oak/router";
import { STATUS_CODE } from "@std/http/status";
import html from "./html.tsx";

const router = new Router();
router.use(async (ctx, next) => {
  if (ctx.request.url.hostname.endsWith("deno.dev")) {
    ctx.response.redirect("https://libspeed.telegram.tools");
    return;
  }
  if (ctx.request.method != "GET") {
    ctx.response.status = STATUS_CODE.MethodNotAllowed;
  } else {
    await next();
  }
});

router.get("/", (ctx) => {
  ctx.response.body = render(html);
});

const app = new Application();

app.use(router.routes());

app.use(async (context) => {
  await context.send({
    root: `${Deno.cwd()}/static`,
  });
});

app.listen({ port: 3000 });
