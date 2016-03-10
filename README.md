# GSQ

GSQ is about simplicity, quick prototyping, creating something that can be easily shared while maintaining an agnostic stance on your favorite frameworks. Bundled in GSQ are a a few modern build tools and a couple `npm` scripts.

## Included Build Tools

**For JS:** Babel and Browserify (with the help of babelify) compile the code

**For CSS:** PostCSS with a few plugins to let you write future spec today: `[ "postcss-import", "autoprefixer", "postcss-nesting", "postcss-custom-media", "postcss-css-variables", "postcss-css-variables", "postcss-discard-comments", "postcss-reporter" ]`

## Getting Started

### To install with git:

```bash
$ git clone https://github.com/tbremer/gsq.git
$ cd gsq
$ rm -r .git && rm -r .gitignore
$ npm install
```

### To install with npm:

```bash
$ npm install --global gsq
$ cd path/to/project
$ gsq
```

## Included `npm` scripts

- `test`: run eslint on your source files.
- `build`: run all of the following files
  - `build:css`: run postcss compiler
  - `build:html`: copy all `src/**/*.html` files into `htdocs/`
  - `build:js`: run the `browserify` compiler.
- `watch`: run all of the following watches
  - `watch:css`: watch `src/css/` for file changes, run `npm build:css` on file changes.
  - `watch:html`: watch `src/**/*.html` for file changes, run `npm build:html` on file changes.
  - `watch:js`: watch `src/js/` for file changes, run `npm build:js` on file changes.
- `watch:start`: run `npm run watch` as well as `npm start`. Watch all files and start browser-sync.
- `start`: start browser-sync.
