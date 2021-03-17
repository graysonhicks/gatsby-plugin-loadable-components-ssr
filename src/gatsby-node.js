import { unlinkSync } from 'fs';
import LoadablePlugin from '@loadable/webpack-plugin';
import { statsFilename, statsPath } from './constants';

export const onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === "build-javascript" || stage === "develop") {
    actions.setWebpackConfig({
      plugins: [
        new LoadablePlugin({
          filename: stage === "develop" ? `public/${statsFilename}` : statsFilename,
          writeToDisk: true,
        }),
      ],
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
