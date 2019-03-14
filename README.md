# Moviehub

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.

## Development server

Install NodeJS (IntelliJ idea might come with it bundled, check that first).
Change standard IntelliJ idea run command to use "update-serve" script.
Download the current list of movies from here: https://mega.nz/#!F5QXAAIb!yWEJbX-v2g7aDKEbA351JGWHrifYpPNjo6aHFYDODwY
Run `update-serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build. The production flag will
automatically be used when using the configured build script.

##Deploy
Build the project, then copy the contents of the /dist/moviehub/ folder into the base directory (where the index.html shall reside) of the webserver (/var/www/html for Apache Webserver).
The connection details of our testserver are the following:
IP: 185.230.163.170
user: root
password: *9HtV7Jaq.

## Adding a new movie
Put all the data of the movie as an own entry into the movieData.json file. Add a thumbnail in .jpg format that is named like the filename specified in the movieData.json.
Add the movie-file in .mp4 format into the movies-folder. DO NOT COMMIT VIDEO FILES! This will lead to not being able to push commits because of the filesize.
Update the movies.rar file and upload it somewhere. Put the download link into this ReadMe.

## Adding a new static text
Add the text with a logical name and the text itself in all languages into the texts.json file.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
