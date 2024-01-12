/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = (env, argv) => {
  return {
    mode: env.mode === "development" ? "development" : "production",
    context: path.resolve(__dirname, "src"),
    entry: "./index.ts",
    devtool: "inline-source-map",
    output: {
      filename: "bundle.js",
    },
    resolve: {
      extensions: [".js", ".ts"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
                presets: [["@babel/preset-env", { targets: { node: "8" } }]],
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
  };
};
