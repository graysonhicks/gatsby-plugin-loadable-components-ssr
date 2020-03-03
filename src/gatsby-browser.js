import { render, hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';

export const replaceHydrateFunction = (_, options) => (element, container, callback) => {
  loadableReady(() => {
    const renderFn = options.renderFn
        ? options.renderFn
        // Using ReactDOM.hydrate on develop will throw an error in console
        : process.env.GATSBY_BUILD_STAGE.includes('develop')
            ? render
            : hydrate;

    renderFn(element, container, callback);
  });
};
