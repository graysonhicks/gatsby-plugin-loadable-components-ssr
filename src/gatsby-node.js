import { unlinkSync } from 'fs';
import LoadablePlugin from '@loadable/webpack-plugin';
import { statsPath } from './constants';

export const onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === "build-javascript" || stage === "develop") {
    actions.setWebpackConfig({
      plugins: [new LoadablePlugin({ filename: statsPath })]
    });
  }
};

export const onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({ name: '@loadable/babel-plugin' });
};

export const onPostBuild = () => {
  // Clean after ourselves
  unlinkSync(statsPath);
};
