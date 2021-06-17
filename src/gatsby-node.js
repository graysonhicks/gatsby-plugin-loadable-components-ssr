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

export const onPostBuild = () => {
  try {
    // Clean after ourselves
    unlinkSync(statsPath)
  } catch (e) {
    // Ignore as we just want to avoid crashing a build.
  }
}
