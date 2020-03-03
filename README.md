## Description

Server-side rendering [loadable components](https://loadable-components.com/) in your gatsby application.

## Installation

`npm install --save gatsby-plugin-loadable-components-ssr`

This plugin also requires `@loadable/component` as a peer dependency:

`npm install --save @loadable/component`

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
    'gatsby-plugin-loadable-components-ssr',
    // OR
    {
        resolve: `gatsby-plugin-loadable-components-ssr`,
        options: {
            // Whether replaceHydrateFunction should call ReactDOM.hydrate or ReactDOM.render
            // Defaults to ReactDOM.render on develop and ReactDOM.hydrate on build
            useHydrate: true,
        },
    }
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
    ReactDOM.render(element, container, callback);
  };
};
```

After:
```javascript
// gatsby-browser.js

const loadableReady = require('@loadable/component').loadableReady;

exports.replaceHydrateFunction = () => {
  return (element, container, callback) => {
    loadableReady(() => {
        ReactDOM.render(element, container, callback);
    });
  };
};
```
