let mix = require("laravel-mix");
let env = process.env.NODE_ENV || "production";
let browser = process.env.BROWSER || "chrome";
let CleanWebpackPlugin = require("clean-webpack-plugin");

let sourcePath = "src";
let browserFiles = `${sourcePath}/browsers/${browser}/`;
let buildPath = `dist/${browser}/${process.env.NODE_ENV}`;

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix
  .js(`${sourcePath}/js/background.js`, `${buildPath}/js`)
  .js(`${sourcePath}/js/popup.js`, `${buildPath}/js`)
  .js(`${sourcePath}/js/content.js`, `${buildPath}/js`)
  .js(`${sourcePath}/js/fill.js`, `${buildPath}/js`)
  .sass(`${sourcePath}/scss/popup.scss`, `${buildPath}/css`)
  .sass(`${sourcePath}/scss/autovote.scss`, `${buildPath}/css`)
  // .extract(['vue', 'jquery', 'moment'])
  .copyDirectory(`${sourcePath}/common`, buildPath)
  .copyDirectory(browserFiles, buildPath)
  .copyDirectory(`${sourcePath}/html`, `${buildPath}/html`)
  .copyDirectory(`${sourcePath}/fonts`, `${buildPath}/fonts`)
  .setPublicPath("./") // fixes build getting stack on windows
  .webpackConfig(webpack => {
    return {
      plugins: [
        new CleanWebpackPlugin(buildPath, {})
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jquery: 'jquery',
        //     'window.jQuery': 'jquery',
        //     jQuery: 'jquery',
        // })
      ]
    };
  });

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.preact(src, output); <-- Identical to mix.js(), but registers Preact compilation.
// mix.coffee(src, output); <-- Identical to mix.js(), but registers CoffeeScript compilation.
// mix.ts(src, output); <-- TypeScript support. Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
// mix.fastSass('src', output); <-- Alias for mix.standaloneSass().
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.test');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Mix's default.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.extend(name, handler) <-- Extend Mix's API with your own components.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
