# hubitat-datacollector
  Small NodeJS project to listen for Hubitat Maker API POST events and capture them to a PostgreSQL database.
# Local Development

## Set Up a Local Postgres DB Container
  Read this section if you are a developer wanting to tinker with the code in this repository locally on your machine.  Prerequisties for this example are to have NodeJS and Docker installed.

### Local DB Setup

  The following steps demonstrate how to start up a new PostgreSQL DB in a Docker container:

  1. Spin up a PostgreSQL Database using Docker:

  ```bash
  docker run -d --name=hubitat-postgres \
    -v /mnt/user/appdata/hubitat-postgres:/var/lib/postgresql/data \ 
   -p 5432:5432 postgres -e POSTGRES_PASSWORD=YourPassword
  ```

  2. Create a `hubitat` DB in the container:
   ```bash
   docker exec --user postgres hubitat-postgres psql -c "CREATE DATABASE hubitat;"
   ```
   3. Create `events` Table
   ```bash
   docker exec --user postgres hubitat-postgres psql hubitat -c "CREATE TABLE IF NOT EXISTS events (name varchar( 255 ) NOT NULL, value varchar( 255 ) NOT NULL, displayName varchar( 255 ) NOT NULL, deviceId varchar ( 255 ) NOT NULL, descriptionText varchar( 255 ), unit varchar( 255 ), type varchar( 255 ), data varchar( 255 ));"
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