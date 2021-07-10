
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
  
  module.exports = withBundleAnalyzer({
    compress: true,

    future: {
      webpack5: true,
    },
    
    env : {
      NAVERLOGINCLIENTCODE:'FQxK6vBp2RiL0gne54KV',
      NAVERLOGINREDIRECT:'http://localhost:3095/api/auth/naverLoginCallback',
      FACEBOOKLOGINCLIENTCODE:'1145587049279696',
      FACEBOOKLOGINREDIRECT:'http://localhost:3095/api/auth/facebookLogin',
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