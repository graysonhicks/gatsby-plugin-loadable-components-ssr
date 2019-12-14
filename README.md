## Description

Server-side rendering [loadable components](https://loadable-components.com/) in your gatsby application.

## Installation

`npm install --save gatsby-plugin-loadable-components`

## Problem

As described in [loadable-components docs](https://loadable-components.com/docs/server-side-rendering/) a series of steps 
must be follow to implement server-side rendering in your app. However, it's not trivial to apply them to a gatsby application.

## Solution

This plugin implements the steps [described in the docs](https://loadable-components.com/docs/server-side-rendering/) 
using gatsby's APIs.

## Usage

```javascript
// gatsby-config.js

module.exports = {
  plugins: [
    'gatsby-plugin-loadable-components'
  ],
}
```

## My `gatsby-browser.js` already implements `replaceHydrateFunction` API

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
