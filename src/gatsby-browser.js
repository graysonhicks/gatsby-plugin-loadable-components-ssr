import { render, hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';

export const replaceHydrateFunction = (_, options) => (element, container, callback) => {
  loadableReady(() => {
    const renderFn = typeof options.useHydrate === 'undefined'
        // Using ReactDOM.hydrate on develop will throw an error in console
        ? process.env.GATSBY_BUILD_STAGE.includes('develop')
            ? render
            : hydrate
        : !!options.useHydrate
            ? hydrate
            : render;

    renderFn(element, container, callback);
  });
};
