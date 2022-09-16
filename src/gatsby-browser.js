import { loadableReady } from "@loadable/component"
import { major } from "semver"

const react18 = JSON.stringify(
  major(require(`react-dom/package.json`).version) >= 18
)

export const replaceHydrateFunction =
  (_, options) => (element, container, callback) => {
    if (react18) {
      const {
        hydrateRoot: hydrate,
        createRoot: render,
      } = require(`react-dom/client`)
    } else {
      const { hydrate, render } = require(`react-dom`)
    }
    loadableReady(() => {
      const renderFn =
        typeof options.useHydrate === "undefined"
          ? // Using ReactDOM.hydrate on develop will throw an error in console
            process.env.BUILD_STAGE.includes("develop")
            ? render
            : hydrate
          : !!options.useHydrate
          ? hydrate
          : render

      renderFn(element, container, callback)
    })
  }
