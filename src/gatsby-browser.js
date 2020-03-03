import { render, hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';

export const replaceHydrateFunction = () => (element, container, callback) => {
  loadableReady(() => {
    // Using ReactDOM.hydrate on develop will throw an error in console
    const renderFn = process.env.GATSBY_BUILD_STAGE.includes('develop') ? render : hydrate;

    renderFn(element, container, callback);
  });
};
