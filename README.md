# Intro

This a proof of concept which looks at the following areas:

- managing and generating themes for tenants
- serving and consuming themes from a "remote" source at runtime
- applying themes to a consuming app
- applying themes to an external component library

## Architecture

There are three projects:

- tenant-service - generates themes for two imaginary tennants and serves them up
- mh3 - a simple "consumer" app, represents an application which wants to use theming and shared components
- lantern - a set of re-usable components which are theme aware. It's imported as a local `npm` package at the moment.

## Getting things running

It's all Javascript, it's all node, you'll need node and npm and stuff. I've not gone to the extent of hooking everything up in a nice package so you'll probably need to `npm i` all the projects in their respective folders.

TODO: In the process of adding a readme for each

- tenant-service - `npm start` - runs the build and starts a server to serve themes on `localhost:4000` on `/brand1/theme.json` etc
- mh3 - `npm start` - runs the `create-react-app` app on port `3000` the port exposed through tenant service is proxied in the package.json so you can access it like `/brand1/theme.json`
- lantern - At the moment and seeing as it's all es6 and stuff, this is just exposed as a normal module, so there is no build step.

## Updating / devving it

There is a bit of an order to stuff which affects what you have to do when changing things.

- tenant-service - If you make changes to the theme files, you'll need to stop and start the server to both build and serve the latest content. The rest of the app will update on it's own though (yey runtime!)
- mh3 - This has hot module reload via create-react-app, so changes you make in here are automatically reflected
- lantern - Since this an an npm package, when you've made changes in here you'll need to re-install the package to mh3, I did this a fair bit so tended to `npm i ../lantern && npm start` in the mh3 folder on changes
