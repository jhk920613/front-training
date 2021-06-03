
const configureMain = require('@nara.platform/storybook/storyConfig/configureMain');

module.exports = configureMain(config => {
  //
  const defaultWebpackFinal = config.webpackFinal;

  config.webpackFinal = async webpackConfig => {
    //
    defaultWebpackFinal(webpackConfig);

    const isProduction = process.env.NODE_ENV === 'production';

    if (isProduction) {
      webpackConfig.output.publicPath = `.`;
    }

    return webpackConfig;
  }

  return config;
});
