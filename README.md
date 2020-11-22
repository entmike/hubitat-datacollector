# hubitat-datacollector

[![GitHub issues](https://img.shields.io/github/issues/entmike/hubitat-datacollector.svg)](https://github.com/entmike/hubitat-datacollector/issues)
[![Docker Pulls](https://img.shields.io/docker/pulls/entmike/hubitat-datacollector.svg)](https://hub.docker.com/r/entmike/hubitat-datacollector/)
[![Automated Build](https://img.shields.io/docker/cloud/automated/entmike/hubitat-datacollector.svg)](https://hub.docker.com/r/entmike/hubitat-datacollector/)

  Small NodeJS project to listen for Hubitat Maker API POST events and capture them to a PostgreSQL database.

# Try it Now with Docker
If you don't care about local development and just want to run it, see the example below.
## Pre-requisites:

1. Docker Installed
2. PostgreSQL Installed somewhere (physical host, VM, Docker, whatever) with a new DB created (i.e. `hubitat`)
3. `events` table created in PostgreSQL DB.  Create statement for your convenience:
```sql
CREATE TABLE IF NOT EXISTS events (
name varchar( 255 ) NOT NULL, value varchar( 255 ) NOT NULL, displayName varchar( 255 ) NOT NULL,
deviceId varchar ( 255 ) NOT NULL, descriptionText varchar( 255 ), unit varchar( 255 ), type varchar( 255 ), 
data varchar( 255 ), timestamp TIMESTAMP DEFAULT NOW());
```

## Example:
```
docker run --rm -ti \
  -e PGHOST=yourpostgreshost -e PGUSER=postgres -e PGPASSWORD=YourPassword \
  -e PGDATABASE=hubitat -e PGPORT=5432 -p 3000:3000 entmike/hubitat-datacollector
```
3. In Hubitat, add a Maker API App (if you haven't already.)
4. In your Maker API App settings, set the 'URL to send device events to by POST' property to the URL of your Docker Container (i.e. `http://mydockerhost:3000` or `http://192.168.1.123:3000`, etc.)
5. Trigger or wait for an event from one of your devices enabled in your Maker API to fire.
6. In `psql` or whatever PostgreSQL client you use, connect to the database and look at the `events` table for updates.

# Local Development

Read this section if you are a developer wanting to tinker with the code in this repository locally on your machine.  Prerequisties for this example are to have NodeJS and Docker installed.

## Set Up a Local Postgres DB Container

### Local DB Setup

  The following steps demonstrate how to start up a new PostgreSQL DB in a Docker container:

  1. Spin up a PostgreSQL Database using Docker:

  ```bash
  docker run -d --name=hubitat-postgres \
    -v /mnt/user/appdata/hubitat-postgres:/var/lib/postgresql/data \ 
   -p 5432:5432 -e POSTGRES_PASSWORD=YourPassword postgres
  ```

  2. Create a `hubitat` DB in the container:
   ```bash
   docker exec --user postgres hubitat-postgres psql -c "CREATE DATABASE hubitat;"
   ```
   3. Create `events` Table
   ```bash
   docker exec --user postgres hubitat-postgres psql hubitat -c "CREATE TABLE IF NOT EXISTS events (name varchar( 255 ) NOT NULL, value varchar( 255 ) NOT NULL, displayName varchar( 255 ) NOT NULL, deviceId varchar ( 255 ) NOT NULL, descriptionText varchar( 255 ), unit varchar( 255 ), type varchar( 255 ), data varchar( 255 ), timestamp TIMESTAMP DEFAULT NOW());"
   ```

## Initial Setup

  1. Clone this Git Repository

  ```bash
  git clone https://github.com/entmike/hubitat-datacollector.git
  ```

  2. Install required npm modules

  ```bash
  npm i
  ```

  3. Maintain your `.env` file

  In the root of your cloned repository, create a filed called `.env` with the following values

  ```ini
  PGUSER=postgres
  PGHOST=yourdbhost
  PGPASSWORD=YourPassword
  PGDATABASE=hubitat
  PGPORT=5432
  ```

## Run Local

```bash
npm run debug
```

## Building your own Docker Image:

```bash
docker build --build-arg CACHE_DATE="$(date)" -t your/dockertag .
```

## Running your Docker Image as Container:

```bash
docker run --rm -ti \
  -e PGHOST=yourpostgreshost -e PGUSER=postgres -e PGPASSWORD=YourPassword \
  -e PGDATABASE=hubitat -e PGPORT=5432 -p 3000:3000 your/dockertag
```
