
const path = require('path');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['microapp']);


module.exports = withPlugins([withTM], {
  pageExtensions: ['page.tsx'],
  distDir: 'dist',
  webpack(config) {
    //
    config.resolve.alias['~'] = path.resolve(__dirname, 'src');
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.node = {
      fs: 'empty',
    };

    return config;
  },
});
