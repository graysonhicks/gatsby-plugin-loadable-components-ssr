import { unlinkSync } from "fs"
import LoadablePlugin from "@loadable/webpack-plugin"

import { LOADABLE_STATS_FILE_PATH } from "./constant"

const isWin = process.platform === "win32"

export const onCreateWebpackConfig = ({ actions, stage }) => {
  if (
    stage === "build-javascript" ||
    stage === "develop" ||
    stage === "develop-html"
  ) {
    actions.setWebpackConfig({
      plugins: [
        new LoadablePlugin({
          filename: LOADABLE_STATS_FILE_PATH,
          writeToDisk: true,
          outputAsset: !isWin,
        }),
      ],
    })
  }
}

export const onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({ name: "@loadable/babel-plugin" })
}
