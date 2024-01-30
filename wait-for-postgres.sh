#!/bin/bash
until nc -z -v -w30 postgres 5432
do
  echo "Aguardando conexão com o PostgreSQL..."
  sleep 2
done
echo "Conexão com o PostgreSQL estabelecida. Iniciando node-app."
exec "$@"
