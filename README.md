# HNGi7 Team-Avengers-stage-2 Task

## Overview

This project is a dockerized micro-service for authentication written in NodeJS as a project by #team-avengers in stage 2 of HNGi7

## Project Setup

- Clone the repo to your local machine using your _terminal_ or _command prompt_, and afterwards, navigate into the root folder

```shell script
$ cd Team-Avengers
```

- Install necessary dependencies for the project to run successfully

```shell script
$ npm install or yarn install
```

- After installing, you can now start the server

```shell script
$ npm start
Listening on port 3000
```

navigate on your browser to `localhost:3000`

## Docker

To run the code, the Docker daemon and the docker-compose tool must be running on localhost.

Run `docker-compose --version` to see if docker-compose is installed

Run `docker-compose build` in the root directory to build the images and run `docker-compose up` to start the services.
