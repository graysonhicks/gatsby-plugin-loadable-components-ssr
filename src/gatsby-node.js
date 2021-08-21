import { unlinkSync } from "fs"
import path from "path"
import LoadablePlugin from "@loadable/webpack-plugin"

const isWin = process.platform === "win32";

const loadableStatsRelativePath = "../.cache/loadable-stats-build-javascript.json";

const statsPath = isWin ? loadableStatsRelativePath : _path.default.join(process.cwd(), loadableStatsRelativePath);

export const onCreateWebpackConfig = ({ actions, stage }) => {
  if (
    stage === "build-javascript" ||
    stage === "develop" ||
    stage === "develop-html"
  ) {
    actions.setWebpackConfig({
      plugins: [
        new LoadablePlugin({
          filename: statsPath,
          writeToDisk: true,
        }),
      ],
    })
  }
}

export const onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({ name: "@loadable/babel-plugin" })
}
