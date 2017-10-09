# Scotland's Digital Participation Charter (public frontend) [![Build Status](https://travis-ci.org/scvodigital/charter-frontend.svg?branch=release)](https://travis-ci.org/scvodigital/charter-frontend)

[![Dependency Status](https://david-dm.org/scvodigital/charter-frontend/release.svg)](https://david-dm.org/scvodigital/charter-frontend/release) [![devDependency Status](https://david-dm.org/scvodigital/charter-frontend/release/dev-status.svg)](https://david-dm.org/scvodigital/charter-frontend/release#info=devDependencies)

This is the repository for the website of Scotland's Digital Participation Charter, it contains the codebase for the public website. Deployment instructions are detailed below.

## Installation
```
git clone https://github.com/scvodigital/charter-frontend
cd charter-frontend
sudo npm i -g typescript firebase-tools @angular/cli
npm i
```

## Run Development Server
```
npm start
```
Navigate to [localhost:9002](http://localhost:9002). The app will automatically reload if you change any of the source files.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

Before running the tests make sure you are serving the app via `ng serve` or `npm start`.

## Live Deployment
### CI
There is continuous integration via [Travis](https://travis-ci.org) on `git push` which automatically deploys to [Google Firebase](https://firebase.google.com) CDN hosting.

### Manually
```
npm run deploy
```
This builds minified code and deploys via Firebase.

## Information
The repository [wiki](https://github.com/scvodigital/charter-frontend/wiki) will contain project documentation.

The website address is [digitalparticipation.scot](https://digitalparticipation.scot).

* [Documentation](https://github.com/scvodigital/charter-frontend/wiki)
* [Bug tracker](https://github.com/scvodigital/charter-frontend/issues)

## Technical Specs
This is an [Angular](https://angular.io) app using [TypeScript](https://www.typescriptlang.org).

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.26.
