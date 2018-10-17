const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    if (target === "web" && !dev) {
      config.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 4000 }));
    }

    return config;
  }
};
