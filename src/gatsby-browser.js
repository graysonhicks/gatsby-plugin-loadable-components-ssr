import { loadableReady } from "@loadable/component"
import { major } from "semver"

const react18 = JSON.stringify(
  major(require(`react-dom/package.json`).version) >= 18
)

export const replaceHydrateFunction =
  (_, options) => (element, container, callback) => {
    if (react18) {
      const reactDomClient = require(`react-dom/client`)
    } else {
      const reactDomClient = require(`react-dom`)
    }
    loadableReady(() => {
      const renderFn =
        typeof options.useHydrate === "undefined"
          ? // Using ReactDOM.hydrate on develop will throw an error in console
            process.env.BUILD_STAGE.includes("develop")
            ? reactDomClient.render
            : reactDomClient.hydrate
          : !!options.useHydrate
          ? reactDomClient.hydrate
          : reactDomClient.render

      renderFn(element, container, callback)
    })
  }
