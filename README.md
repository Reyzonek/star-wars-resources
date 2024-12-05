### Configuration

After checkout of a repository, please perform the following steps in exact sequence:

1. Copy docker-compose.override
    ```
    $ cp docker-compose.override.yml.dist docker-compose.override.yml
    ```

2. Create `.env` file from `.env.dist`
    ```
    $ cp .env.dist .env
    ```

    Remember to fill up required values in `.env`

3. Run `npm i`

4. Run `npm run docker-build`

5. Run watch - `npm run watch`

##

### Dev setup

This app is fully dockerized, so in order to use it you have to have docker and docker-compose installed. What's more you need to have npm in order to run npm scripts.

1. In order to run the whole app type:

    ```
    npm run start
    ```

2. In order to watch files for dev purpose type:

    ```
    npm run watch
    ```

3. If you need to close all containers run:

    ```
    npm run down
    ```

4. To get into Docker container's shell:

    ```
    npm run shell
    ```

##

#### Adminer setup

Adminer is configured in `docker-compose.override.yml` and should work out of the box on port 8080. To login to adminer use the following values:
```
Database type: postgres
Server: postgres
User: postgres
Password: password
Database: app
```

Of course, if any of this is changed via configuration or otherwise, then these changes must be reflected here as well.

##

### Debugging

#### VS Code

There is `launch.json` configuration inside `editors/vsc` directory. Just copy it and create new debugger to make it work with vsc

##

### Tests

There are two types of tests:

- integration: `npm run integration`
- units: `npm run units`

##