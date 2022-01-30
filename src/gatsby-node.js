import path from "path"

import LoadablePlugin from "@loadable/webpack-plugin"

import { LOADABLE_STATS_FILE_PATH } from "./constant"

const isWin = process.platform === "win32"

export const onCreateWebpackConfig = ({ actions, stage }) => {
  // for builds we point to stats file that will be produced by `build-javascript`
  // for develop we point to empty mocked stats, just so gatsby-ssr continue to work

  const fullPath =
    stage === `build-javascript` || stage === `build-html`
      ? path.join(process.cwd(), LOADABLE_STATS_FILE_PATH)
      : require.resolve(`./develop-stats.json`)

  const config = {
    resolve: {
      alias: {
        "gatsby-plugin-loadable-components-ssr-stats-file": fullPath,
      },
    },
  }

  if (stage === "build-javascript") {
    config.plugins = [
      new LoadablePlugin({
        filename: fullPath,
        writeToDisk: true,
        outputAsset: !isWin,
      }),
    ]
  }

  actions.setWebpackConfig(config)
}

export const onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({ name: "@loadable/babel-plugin" })
}
