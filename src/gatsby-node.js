import LoadablePlugin from '@loadable/webpack-plugin';
import { statsFilename } from './constants';

export const onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === "build-javascript" || stage === "develop" || stage === "develop-html") {
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
