export default defineEventHandler(() => {
  return new Response(
    ["User-agent: *", "Allow: /", "Sitemap: /sitemap.xml"].join("\n"),
    {
      headers: {
        "content-type": "text/plain; charset=utf-8",
      },
    },
  );
});
