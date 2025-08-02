import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_HEADER, k as decodeKey } from './chunks/astro/server_Dvw0LW6-.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/","cacheDir":"file:///home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/node_modules/.astro/","outDir":"file:///home/rdelgado/Development/claude-code-agents/docs/","srcDir":"file:///home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/src/","publicDir":"file:///home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/public/","buildClientDir":"file:///home/rdelgado/Development/claude-code-agents/docs/client/","buildServerDir":"file:///home/rdelgado/Development/claude-code-agents/docs/server/","adapterName":"","routes":[{"file":"file:///home/rdelgado/Development/claude-code-agents/docs/articles/how-to-expand-your-team-with-dotagents/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/articles/how-to-expand-your-team-with-dotagents","isIndex":false,"type":"page","pattern":"^\\/articles\\/how-to-expand-your-team-with-dotagents\\/?$","segments":[[{"content":"articles","dynamic":false,"spread":false}],[{"content":"how-to-expand-your-team-with-dotagents","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/articles/how-to-expand-your-team-with-dotagents.astro","pathname":"/articles/how-to-expand-your-team-with-dotagents","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/rdelgado/Development/claude-code-agents/docs/articles/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/articles","isIndex":false,"type":"page","pattern":"^\\/articles\\/?$","segments":[[{"content":"articles","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/articles.astro","pathname":"/articles","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/rdelgado/Development/claude-code-agents/docs/contributing/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contributing","isIndex":false,"type":"page","pattern":"^\\/contributing\\/?$","segments":[[{"content":"contributing","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contributing.astro","pathname":"/contributing","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/rdelgado/Development/claude-code-agents/docs/installation/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/installation","isIndex":false,"type":"page","pattern":"^\\/installation\\/?$","segments":[[{"content":"installation","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/installation.astro","pathname":"/installation","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/rdelgado/Development/claude-code-agents/docs/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://iamrichardd.github.io/dotagents","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/src/pages/articles.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/articles@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/src/pages/articles/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/articles/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/src/pages/articles/how-to-expand-your-team-with-dotagents.astro",{"propagation":"none","containsHead":true}],["/home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/src/pages/contributing.astro",{"propagation":"none","containsHead":true}],["/home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/src/pages/installation.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/articles/how-to-expand-your-team-with-dotagents@_@astro":"pages/articles/how-to-expand-your-team-with-dotagents.astro.mjs","\u0000@astro-page:src/pages/articles@_@astro":"pages/articles.astro.mjs","\u0000@astro-page:src/pages/articles/[...slug]@_@astro":"pages/articles/_---slug_.astro.mjs","\u0000@astro-page:src/pages/contributing@_@astro":"pages/contributing.astro.mjs","\u0000@astro-page:src/pages/installation@_@astro":"pages/installation.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_C0yLcn6Q.mjs","/home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_C3Rxoal9.mjs","/home/rdelgado/Development/claude-code-agents/.claude/agents/agile-coach.md":"chunks/agile-coach_CRlhQtHr.mjs","/home/rdelgado/Development/claude-code-agents/.claude/agents/designer.md":"chunks/designer_BzTC6ceS.mjs","/home/rdelgado/Development/claude-code-agents/.claude/agents/e2e-tester.md":"chunks/e2e-tester_B5VR1VRs.mjs","/home/rdelgado/Development/claude-code-agents/.claude/agents/frontend-developer.md":"chunks/frontend-developer_DM0MD95C.mjs","/home/rdelgado/Development/claude-code-agents/.claude/agents/marketing-expert.md":"chunks/marketing-expert_DuuoiHhv.mjs","/home/rdelgado/Development/claude-code-agents/.claude/agents/project-manager.md":"chunks/project-manager_DxGe3TPN.mjs","/home/rdelgado/Development/claude-code-agents/.claude/agents/technical-writer.md":"chunks/technical-writer_5hOuKaLo.mjs","/home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_B8ZcxSM_.mjs","/home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/src/pages/articles.astro?astro&type=script&index=0&lang.ts":"_astro/articles.astro_astro_type_script_index_0_lang.BmLVCokw.js","/home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.CuAc2grN.js","/home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/src/layouts/ArticleLayout.astro?astro&type=script&index=0&lang.ts":"_astro/ArticleLayout.astro_astro_type_script_index_0_lang.CBCJDvL0.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/src/pages/articles.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{document.querySelectorAll(\".publish-date[data-publish-date]\").forEach(t=>{const e=t.getAttribute(\"data-publish-date\"),a=new Date(e),n=new Intl.DateTimeFormat(navigator.language,{year:\"numeric\",month:\"long\",day:\"numeric\"}).format(a);t.textContent=n})});"],["/home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/src/pages/index.astro?astro&type=script&index=0&lang.ts","function u(e){let t={openIndex:null};return{transition:(r,o)=>{if(r===\"TOGGLE\"){const{index:c}=o;if(c<0||c>=e)return;t.openIndex===c?t.openIndex=null:t.openIndex=c}},getState:()=>t}}const s=document.querySelectorAll(\".agent-item\"),a=u(s.length);function l(e){s.forEach((t,i)=>{const n=t.querySelector(\".agent-content\"),r=t.querySelector(\".icon\"),o=e.openIndex===i;t.classList.toggle(\"active\",o),r.textContent=o?\"-\":\"+\",n.style.maxHeight=o?n.scrollHeight+\"px\":null})}s.forEach((e,t)=>{e.querySelector(\".agent-header\").addEventListener(\"click\",()=>{a.transition(\"TOGGLE\",{index:t});const n=a.getState();l(n)})});l(a.getState());"],["/home/rdelgado/Development/claude-code-agents/.project/src-gh-pages/src/layouts/ArticleLayout.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const t=document.querySelector(\".meta[data-publish-date]\");if(t){const e=t.getAttribute(\"data-publish-date\"),a=new Date(e),n=new Intl.DateTimeFormat(navigator.language,{year:\"numeric\",month:\"long\",day:\"numeric\"}).format(a);t.textContent=t.textContent.replace(e,n)}});"]],"assets":["/file:///home/rdelgado/Development/claude-code-agents/docs/articles/how-to-expand-your-team-with-dotagents/index.html","/file:///home/rdelgado/Development/claude-code-agents/docs/articles/index.html","/file:///home/rdelgado/Development/claude-code-agents/docs/contributing/index.html","/file:///home/rdelgado/Development/claude-code-agents/docs/installation/index.html","/file:///home/rdelgado/Development/claude-code-agents/docs/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"X3PDtSY0oCazXdiMjb5bwOYoGCSz6zhQx3g6aRPQRRE="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
