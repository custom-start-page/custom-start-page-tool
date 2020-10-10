# Custom Start Page Tool

[![npm version](https://badge.fury.io/js/custom-start-page-tool.svg)](https://badge.fury.io/js/custom-start-page-tool)

> A CLI tool for helping you develop start pages that integrate with https://customstart.page.

## Requirements

- Node v8.11.1 or higher
- NPM v5.6.0 or higher

## Getting started

To use this with a start page:

1. `npm install custom-start-page-tool --save`
1. `node ./node_modules/custom-start-page-tool/ server`

## Developing this package

1. Run `npm link` in the root of this directory
1. Go to a startpage and run `npm link custom-start-page-tool`
1. Run `nodemon ../node_modules/custom-start-page-tool/ server --watch ../ --watch D:\\Dev\\Sites\\custom-start-page\\custom-start-page-tool`
1. Start developing!

## Releasing

1. Run `npm pack` and verify the files before publishing
1. Ensure the version number of the package is up to date
1. Run `npm publish` to push to NPM
