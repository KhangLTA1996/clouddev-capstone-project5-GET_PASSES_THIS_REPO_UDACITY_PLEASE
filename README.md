# Project: Monolith Cloud Developer Capstone

This is a simple cloud application developed from the base source of Monolith project (Project 3) from the same Udacity's Cloud Developer course, which serves as how a normal section of trivia's item-contained cart from a big website works under cloud architecture implementations.

The project is divided into two parts:
1. Frontend - Angular web application built with Ionic Framework
2. Backend RESTful API - Node-Express application

### Prerequisite
1. The depends on the Node Package Manager (NPM). You will need to download and install Node from [https://nodejs.com/en/download](https://nodejs.org/en/download/). This will allow you to be able to run `npm` commands.
2. Environment variables will need to be set. These environment variables include database connection details that should not be hard-coded into the application code.

### 1. Database
Create a PostgreSQL database either locally or on AWS RDS. The database is used to store the application's metadata.

* We will need to use password authentication for this project. This means that a username and password is needed to authenticate and access the database.
* The port number will need to be set as `5432`. This is the typical port that is used by PostgreSQL so it is usually set to this port by default.

Once your database is set up, set the config values for environment variables prefixed with `POSTGRES_` in `set_env.sh`.
* If you set up a local database, your `POSTGRES_HOST` is most likely `localhost`
* If you set up an RDS database, your `POSTGRES_HOST` is most likely in the following format: `***.****.us-west-2.rds.amazonaws.com`. You can find this value in the AWS console's RDS dashboard.

### 2. S3
Create an AWS S3 bucket. The S3 bucket is used to store images that are displayed in Udagram.

We can set the config values for environment variables prefixed with `AWS_` in a local `set_env.sh` file.

### 3. Backend API
Launch the backend API locally. The API is the application's interface to S3 and the database.

* To download all the package dependencies, run the command from the directory `udagram-api/`:
    ```bash
    npm install .
    ```
* To run the application locally, run:
    ```bash
    npm run dev
    ```
* You can visit `http://localhost:8080/api/v0/feed` in your web browser to verify that the application is running. You should see a JSON payload. Feel free to play around with Postman to test the API's.

### 4. Frontend App
Launch the frontend app locally.

* To download all the package dependencies, run the command from the directory `frontend/`:
    ```bash
    npm install --force
    ```
* Install Ionic Framework's Command Line tools for us to build and run the application:
    ```bash
    npm install -g ionic
    ```
* Prepare your application by compiling them into static files.
    ```bash
    ionic build
    ```
* Run the application locally using files created from the `ionic build` command.
    ```bash
    ionic serve
    ```
* You can visit `http://localhost:4200` in your web browser to verify that the application is running. You should see a web interface or you can visit this website below:

```
Website link: http://ae9547b0e57fa47eca9dc0c4af6f3e25-598402622.us-west-2.elb.amazonaws.com
```

Have a nice review.