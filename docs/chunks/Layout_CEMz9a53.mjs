import { c as createAstro, a as createComponent, d as addAttribute, e as renderHead, f as renderSlot, b as renderTemplate } from './astro/server_DWcmU5vy.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                            */

const $$Astro = createAstro("https://iamrichardd.github.io/dotagents");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body data-astro-cid-sckkx6r4> <header data-astro-cid-sckkx6r4> <div class="logotype" data-astro-cid-sckkx6r4> <a href="/" class="logotype-link" data-astro-cid-sckkx6r4> <span class="primary" data-astro-cid-sckkx6r4>dotagents</span> <span class="secondary" data-astro-cid-sckkx6r4>| An AI-Powered Development Team</span> </a> </div> <nav data-astro-cid-sckkx6r4> <a href="/" data-astro-cid-sckkx6r4>Home</a> <a href="/installation" data-astro-cid-sckkx6r4>Installation</a> <a href="/contributing" data-astro-cid-sckkx6r4>Contributing</a> <a href="/articles" data-astro-cid-sckkx6r4>Articles</a> <a href="/development-insights" data-astro-cid-sckkx6r4>Insights</a> </nav> </header> <main data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </main> <footer data-astro-cid-sckkx6r4> <p data-astro-cid-sckkx6r4>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} dotagents. All rights reserved.</p> </footer> </body></html>`;
}, "/home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
