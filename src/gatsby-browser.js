import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';

export const replaceHydrateFunction = () => (element, container, callback) => {
  loadableReady(() => {
    hydrate(element, container, callback);
  });
};
