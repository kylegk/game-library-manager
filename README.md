# Game Library Manager
This project is a very simple API and web application for managing a video game library. The library offers simple CRUD operations for adding, editing, and removing games from the library. 

There are three main components to this application: an API written in Golang, a front-end written in React, and a data model created for PostgreSQL.

## Project Directories
* `api/` - The Golang API
* `js/` - The React application
* `sql/` - The SQL files required to build the schema and a couple rows of sample games.

## Getting Started

### Database
The first step in running this project is to create the data store the API will be querying against. As mentioned in the project description, this data model is built specifically for the featureset of PostgreSQL. Please verify that you have a working PostgreSQL installation before proceeding.

There are three files in the `/sql` directory, and order of execution is important as one file creates the schema and the other two populate data in the tables.

* `create_database_schema` - This should be executed first. It will create a new database and create the required tables for this project.
* `country_list` - A list of countries. This table exists for the purposes of selecting the country the game is associated with.
* `populate_game_list` - A couple of games used as test data while developing the application. 

PLEASE NOTE: These game entries are not complete, they do not have an image or country code associated with them. Feel free to skip this file if you'd like, or if you want to run it, you can assoicate a country and image in the front-end after the fact.

### API
Now that the database has been created, the next step is setting and initializing the API. To get started with the API, change into the `api/` directory and run `go get`. 

Once the required Go libraries have been installed, you will want to setup your `.env` environment file. I have included a template file named `env_template` that can be copied and modified. The configuration options should be pretty straight forward with the exception of `ORIGIN_ALLOWED`. This configuration option is used for configuring CORS as development of all components of this project was done on the same host. If set to `*`, the front-end will not be blocked when making API requests if the front-end and API are executing on the same host.

After configuring the `.env` file, you can start the API by executing the apporpiate `go run main.go` or `go build` commands.

### React front-end
This part of the project is the most straight forward to get running. Simply switch to the `js/` directory and execute `yarn` or `npm install` to install the required packages. Once the packages are installed, start the project using `yarn start` or `npm start`.
