const path = require('path')

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: 'asset/resource',
      include: path.resolve(__dirname, 'public/.well-known'),
      generator: {
        filename: '.well-known/[name][ext]',
      },
    })
    return config
  },
}
