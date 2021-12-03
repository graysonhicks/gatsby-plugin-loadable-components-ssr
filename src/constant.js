import path from "path"

const GATSBY_CACHE_PATH = "./.cache"
const GATSBY_RENDER_VALIDATION_PREFIX_PATH = "page-ssr"
export const LOADABLE_STATS_FILE_NAME = "loadable-stats-build-javascript.json"

export const LOADABLE_STATS_FILE_PATH = path.join(
  GATSBY_CACHE_PATH,
  GATSBY_RENDER_VALIDATION_PREFIX_PATH,
  LOADABLE_STATS_FILE_NAME
)
