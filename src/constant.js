import path from "path"

export const GATSBY_CACHE_PATH = "./.cache"
export const GATSBY_RENDER_VALIDATION_PREFIX_PATH = "page-ssr"
export const LOADABLE_STATS_FILE_NAME = "loadable-stats-build-javascript.json"
export const LOADABLE_STATS_FILE_PATH = path.join(
  process.cwd(),
  GATSBY_CACHE_PATH,
  GATSBY_RENDER_VALIDATION_PREFIX_PATH,
  LOADABLE_STATS_FILE_NAME
)
