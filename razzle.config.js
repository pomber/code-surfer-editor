const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const fs = require("fs");
const path = require("path");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    if (target === "web" && !dev) {
      config.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 4000 }));
    }

    if (target === "web" && dev) {
      config.entry = {
        editor: [resolveApp("src/editor.client")],
        frame: [resolveApp("src/frame.client")]
      };
      config.output.filename = "static/js/[name].bundle.js";
    }

    return config;
  }
};
