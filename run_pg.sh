#!/bin/sh -x

docker stop em-postgres
docker rm em-postgres
docker run -d \
	--name em-postgres \
	-p [::1]:5432:5432 \
	-e POSTGRES_PASSWORD=6 \
	-v ~yes/employee-management/pgdata:/var/lib/postgresql/data \
	--restart unless-stopped \
	--pull always \
	postgres:16-bookworm
