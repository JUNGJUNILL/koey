const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });

const nextConfig =  withBundleAnalyzer({

    compress: true,

    experimental: {
      scrollRestoration: true,
    },
    
    future: {
      webpack5: true,
    },
    
    env : {
      NAVERLOGINCLIENTCODE:'FQxK6vBp2RiL0gne54KV',
      NAVERLOGINREDIRECT_LOCAL:'http://localhost:3333/api/auth/naverLoginCallback',
      NAVERLOGINREDIRECT:'http://api.jscompany.live:3333/api/auth/naverLoginCallback',
      FACEBOOKLOGINCLIENTCODE:'1145587049279696',
      FACEBOOKLOGINREDIRECT_LOCAL:'http://localhost:3333/api/auth/facebookLogin',
      FACEBOOKLOGINREDIRECT:'http://api.jscompany.live:3333/api/auth/facebookLogin',
    },

    webpack(config, { webpack }) {
      const prod = process.env.NODE_ENV === 'production';
      return {
        ...config,
        mode: prod ? 'production' : 'development',
        devtool: prod ? 'hidden-source-map' : 'eval',
        plugins: [
          ...config.plugins,
          new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
        ],
      };
    },
  });

  module.exports = withPlugins(
    [ [withImages, {}],
    ], nextConfig

);
    