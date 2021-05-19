import { unlinkSync } from "fs"
import path from "path"
import LoadablePlugin from "@loadable/webpack-plugin"

const statsPath = path.join(
  process.cwd(),
  "/public/loadable-stats-build-javascript.json"
)

export const onCreateWebpackConfig = ({ actions, stage }) => {
  if (
    stage === "build-javascript" ||
    stage === "develop" ||
    stage === "develop-html"
  ) {
    actions.setWebpackConfig({
      plugins: [
        new LoadablePlugin({
          filename:
            stage === "develop"
              ? statsPath
              : path.join(
                  process.cwd(),
                  "/loadable-stats-build-javascript.json"
                ),
          writeToDisk: true,
        }),
      ],
    })
  }
}

export const onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({ name: "@loadable/babel-plugin" })
}

export const onPostBuild = () => {
  // Clean after ourselves
  unlinkSync(statsPath)
}
