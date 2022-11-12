#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  \c s42
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOSQL