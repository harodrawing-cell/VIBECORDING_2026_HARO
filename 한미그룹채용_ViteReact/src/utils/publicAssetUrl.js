const applicationRoot = new URL(
  import.meta.env.DEV ? "../../" : "../",
  import.meta.url,
);

export function publicAssetUrl(path) {
  return new URL(path.replace(/^\/+/, ""), applicationRoot).href;
}
