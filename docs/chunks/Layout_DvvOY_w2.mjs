import { e as createAstro, c as createComponent, a as renderTemplate, f as renderSlot, d as addAttribute, j as renderHead } from './astro/server_Dvw0LW6-.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                          */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://iamrichardd.github.io/dotagents");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><title>", "</title>", '</head> <body data-astro-cid-sckkx6r4> <header data-astro-cid-sckkx6r4> <div class="logotype" data-astro-cid-sckkx6r4> <a', ' class="logotype-link" data-astro-cid-sckkx6r4> <span class="primary" data-astro-cid-sckkx6r4>dotagents</span> <span class="secondary" data-astro-cid-sckkx6r4>An AI-Powered Development Team</span> </a> </div> <nav id="main-nav" data-astro-cid-sckkx6r4> <a', " data-astro-cid-sckkx6r4>Home</a> <a", " data-astro-cid-sckkx6r4>Installation</a> <a", " data-astro-cid-sckkx6r4>Contributing</a> <a", ' data-astro-cid-sckkx6r4>Articles</a> </nav> <button id="hamburger-menu" aria-label="Toggle navigation" data-astro-cid-sckkx6r4> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-sckkx6r4> <line x1="3" y1="12" x2="21" y2="12" data-astro-cid-sckkx6r4></line> <line x1="3" y1="6" x2="21" y2="6" data-astro-cid-sckkx6r4></line> <line x1="3" y1="18" x2="21" y2="18" data-astro-cid-sckkx6r4></line> </svg> </button> </header> <main data-astro-cid-sckkx6r4> ', " </main> <footer data-astro-cid-sckkx6r4> <p data-astro-cid-sckkx6r4>&copy; ", " dotagents. All rights reserved.</p> </footer> <script client:load>\n  const hamburgerButton = document.getElementById('hamburger-menu');\n  const mainNav = document.getElementById('main-nav');\n\n  hamburgerButton.addEventListener('click', () => {\n    mainNav.classList.toggle('is-open');\n  });\n</script> </body></html>"])), addAttribute(Astro2.generator, "content"), title, renderHead(), addAttribute("/", "href"), addAttribute("/", "href"), addAttribute(`${"/"}installation`, "href"), addAttribute(`${"/"}contributing`, "href"), addAttribute(`${"/"}articles`, "href"), renderSlot($$result, $$slots["default"]), (/* @__PURE__ */ new Date()).getFullYear());
}, "/home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
