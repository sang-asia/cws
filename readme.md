# CWS Admin Theme

# Requirement

This project uses [npm scripts](https://docs.npmjs.com/misc/scripts) for its build system. Our `package.json` includes convenient methods for working with the framework, including compiling code, running tests, and more.

To use our build system and run our documentation locally, you'll need a copy of project's source files and Node. Follow these steps and you should be ready to rock:

1. [Download and install Node.js](https://nodejs.org/en/download/), which we use to manage our dependencies.
2. Navigate to the root directory and run `npm install` to install our local dependencies listed in `package.json`.
3. [Install Ruby][install-ruby], install [Bundler][gembundler] with `gem install bundler`, and finally run `bundle install`. This will install all Ruby dependencies, such as Jekyll and plugins.
  - **Windows users:** Read [this guide](https://jekyllrb.com/docs/windows/) to get Jekyll up and running without problems.

When completed, you'll be able to run the various commands provided from the command line.

[install-ruby]: https://www.ruby-lang.org/en/documentation/installation/
[gembundler]: https://bundler.io/

# Commands

- `npm run build`: build project to pure HTML/CSS/JS, all files will be placed in `_site` folder.
- `npm run clean`: cleanup generated stuffs, such as: Jekyll cache folder, `_site` folder;
- `npm run start`: start development with file watchers and local Jekyll's server (http://localhost:4000/);

# Tags Input

This theme is using [selectize.js](https://github.com/selectize/selectize.js) to support tags input.

```html
<input data-toggle="tags" />
```
