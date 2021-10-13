## Description

Server-side rendering [loadable components](https://loadable-components.com/) in your gatsby application.

## Installation

`npm install --save gatsby-plugin-loadable-components-ssr @loadable/component`

_Latest version of this plugin for v2 Gatsby is 2.1.0_

## Problem

As described in [the documentation](https://loadable-components.com/docs/server-side-rendering/) a series of steps
must be followed to implement server-side rendering in your app. However, it's not trivial to apply them to a gatsby application.

## Solution

This plugin implements the steps described in the link above using gatsby's APIs, so you can use it only by adding
`gatsby-plugin-loadable-components-ssr` in your list of gatsby plugins.

## Usage

Simply add `gatsby-plugin-loadable-components-ssr` to the plugins array in `gatsby-config.js`.

```javascript
// gatsby-config.js

module.exports = {
  plugins: [
    "gatsby-plugin-loadable-components-ssr",
    // OR
    {
      resolve: `gatsby-plugin-loadable-components-ssr`,
      options: {
        // Whether replaceHydrateFunction should call ReactDOM.hydrate or ReactDOM.render
        // Defaults to ReactDOM.render on develop and ReactDOM.hydrate on build
        useHydrate: true,
      },
    },
  ],
}
```

## My gatsby-browser.js already implements replaceHydrateFunction API

This plugin uses `replaceHydrateFunction` API. If your application also implements this API (`gatsby-browser.js`)
make sure you wrap your implementation with `loadableReady(() => ...)`.

Before (from the example [in here](https://www.gatsbyjs.org/docs/browser-apis/#replaceHydrateFunction)):

```javascript
// gatsby-browser.js

exports.replaceHydrateFunction = () => {
  return (element, container, callback) => {
    ReactDOM.render(element, container, callback)
  }
}
```

After:

```javascript
// gatsby-browser.js

const loadableReady = require("@loadable/component").loadableReady

exports.replaceHydrateFunction = () => {
  return (element, container, callback) => {
    loadableReady(() => {
      ReactDOM.render(element, container, callback)
    })
  }
}
```

## Note on Fully Dynamic Imports

While loadable does support fully dynamic imports (e.g. `const MyDynamic = loadable(() => import(`/components/${myComponentVar}`))`), the plugin currently loses the relationship between that chunk and the webpack mapping so it 404s.  The [workaround is here using a hardcoded 'map' component](https://github.com/graysonhicks/gatsby-plugin-loadable-components-ssr/issues/4#issuecomment-684814893).  This works well, but does not scale as well as fully dynamic as the number of components grows.  There is not a plan to resolve this, as the hope is to deprecate this library when React 18 gets a stable release and you could use the `React.lazy()` pattern [described here](https://www.youtube.com/watch?v=lypEGNEIRKE).
