#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE DATABASE s42;
  \c s42
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOSQL