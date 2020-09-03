const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const UglifyJS = require("uglify-es"); //minificador js
const htmlmin = require("html-minifier");
const slugify = require("slugify");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  //WEBPACK
  // Necesario para evitar que once ignore los cambios en `webpack.njk`
  // ya que está en nuestro `.gitignore`
  //eleventyConfig.setUseGitIgnore(false);

  // Permitir que once comprendan archivos yaml
  // principalmente porque queremos soporte de comentarios en el archivo de datos.
  //eleventyConfig.addDataExtension('yml', (contents) => yaml.safeLoad(contents));

  //WEBPACK

  // Eleventy Navigation https://www.11ty.dev/docs/plugins/navigation/
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Configuration API: use eleventyConfig.addLayoutAlias(from, to) to add
  // layout aliases! Say you have a bunch of existing content using
  // layout: post. If you don’t want to rewrite all of those values, just map
  // post to a new file like this:
  // eleventyConfig.addLayoutAlias("post", "layouts/my_new_post_layout.njk");

  // Merge data instead of overriding
  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // Date formatting (human readable)
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  // Date formatting (machine readable)
  eleventyConfig.addFilter("machineDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  // Minify CSS
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });09

  // Minify JS
  eleventyConfig.addFilter("jsmin", function(code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log("UglifyJS error: ", minified.error);
      return code;
    }
    return minified.code;
  });

  // Minify HTML output
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath.indexOf(".html") > -1) {
      let minified = htmlmin.minify(content, {
        // useShortDoctype: true,
        // removeComments: true,
        // collapseWhitespace: true,
        // collapseWhitespace: true,

        // removeRedundantAttributes: true,
        // removeScriptTypeAttributes: true,
        // removeStyleLinkTypeAttributes: true
      });
      return minified;
    }
    return content;
  });

  // Minify eleventy pages in production webpack
  // if (process.env.NODE_ENV === 'production') {
  //   eleventyConfig.addTransform('html-min', (content, outputPath) =>
  //     outputPath.endsWith('.html')
  //       ? htmlmin.minify(content, {
  //           collapseWhitespace: true,
  //           removeComments: true,
  //           removeRedundantAttributes: true,
  //           removeScriptTypeAttributes: true,
  //           removeStyleLinkTypeAttributes: true,
  //           useShortDoctype: true
  //         })
  //       : content
  //   );
  // }

  // Universal slug filter strips unsafe chars from URLs
  eleventyConfig.addFilter("slugify", function(str) {
    return slugify(str, {
      lower: true,
      replacement: "-",
      remove: /[*+~.·,()'"`´%!?¿:@]/g
    });
  });

  // Don't process folders with static assets e.g. images  
  //eleventyConfig.addPassthroughCopy('robots.txt');//Desde webpack
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("static/img");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("_includes/assets/");
  eleventyConfig.addPassthroughCopy("_includes/fonts/");

  /* Markdown Plugins */
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: false
  };

  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts)
  );

  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
