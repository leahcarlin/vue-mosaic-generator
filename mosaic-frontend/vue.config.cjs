module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/vue-mosaic-generator/" : "/",
  outputDir: "../dist", // Ensure the build outputs at the repo root for GitHub Pages
};
