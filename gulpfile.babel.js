const gulp = require("gulp");
const rename = require("gulp-rename");

function pcss(cb, path = "src/**/*.pcss") {
  const postcss = require("gulp-postcss");
  const precss = require("precss");
  const tailwindcss = require("tailwindcss");

  const postcssPlugins = [tailwindcss("./tailwind.js"), precss()];

  if (process.env.NODE_ENV == "production") {
    const cssnano = require("cssnano");
    postcssPlugins.push(cssnano());
  }

  gulp
    .src(path)
    .pipe(postcss(postcssPlugins))
    .pipe(rename({ extname: ".module.css" }))
    .pipe(
      gulp.dest(file => {
        return file.base;
      })
    );

  cb();
}

function watch_pcss(cb) {
  gulp
    .watch("src/**/*.pcss", { queue: false, delay: 500 })
    .on("change", path => {
      process.stdin.write("changed: " + path + "\n");
      pcss(cb, path);
    });

  cb();
}

exports.pcss = pcss;
exports.watch_pcss = gulp.series(pcss, watch_pcss);
