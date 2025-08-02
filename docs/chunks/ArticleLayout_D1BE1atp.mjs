import { e as createAstro, c as createComponent, r as renderComponent, b as renderScript, a as renderTemplate, m as maybeRenderHead, d as addAttribute, f as renderSlot } from './astro/server_Dvw0LW6-.mjs';
import 'kleur/colors';
import { $ as $$Layout } from './Layout_DvvOY_w2.mjs';

const $$Astro = createAstro("https://iamrichardd.github.io/dotagents");
const $$ArticleLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ArticleLayout;
  const { frontmatter } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": frontmatter.title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="content"> <h1>${frontmatter.title}</h1> <p class="meta"${addAttribute(frontmatter.publishDate, "data-publish-date")}>By ${frontmatter.author} on ${frontmatter.publishDate}</p> ${renderSlot($$result2, $$slots["default"])} </article> ` })} ${renderScript($$result, "/home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/src/layouts/ArticleLayout.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/src/layouts/ArticleLayout.astro", void 0);

export { $$ArticleLayout as $ };
