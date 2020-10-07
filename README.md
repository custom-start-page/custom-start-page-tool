# Custom Start Page Tool

> A CLI tool for helping you develop start pages that integrate with https://customstart.page.

## Requirements

- Node v8.11.1 or higher
- NPM v5.6.0 or higher

## Getting started

1. `npm install custom-start-page-tool --save`
2. `node node_modules/custom-start-page-tool/dist/index.js server`

## Developing this package

1. Run `npm link` in the root of this directory
2. Go to a startpage and run `npm link custom-start-page-tool`
3. Run `nodemon ../node_modules/custom-start-page-tool/ server --watch ../ --watch D:\\Dev\\Sites\\custom-start-page\\custom-start-page-tool`
4. Start developing!

## Releasing

1. Run `npm pack` and verify the files before publishing
2. Ensure the version number of the package is up to date
2. Run `npm publish` to push to NPM
