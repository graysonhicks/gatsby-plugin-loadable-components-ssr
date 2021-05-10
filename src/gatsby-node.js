import { existsSync, unlinkSync } from 'fs';
import LoadablePlugin from '@loadable/webpack-plugin';
import { statsFilename, statsPath } from './constants';

export const onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      plugins: [new LoadablePlugin({ filename: statsFilename })],
    });
  }
};

export const onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({ name: '@loadable/babel-plugin' });
};

export const onPostBuild = () => {
  // Clean after ourselves
  if (existsSync(statsPath)) {
    unlinkSync(statsPath);
  }
};
