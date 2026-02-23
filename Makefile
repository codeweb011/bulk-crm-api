.PHONY: network-create postgres-up postgres-down postgres-logs postgres-shell pgadmin-start pgadmin-stop pgadmin-remove pgadmin-logs infra-restart

network-create:
	-docker network create crm-network

postgres-up: network-create
	-docker stop postgres-db
	-docker rm postgres-db
	docker run -d \
	--name postgres-db \
	--network crm-network \
	-e POSTGRES_USER=admin \
	-e POSTGRES_PASSWORD=admin123 \
	-e POSTGRES_DB=bulk-action-db \
	-p 5432:5432 \
	-v postgres_data:/var/lib/postgresql/data \
	postgres:16

postgres-down:
	docker stop postgres-db && docker rm postgres-db

postgres-logs:
	docker logs -f postgres-db

postgres-shell:
	docker exec -it postgres-db psql -U admin -d bulk-action-db


pgadmin-start: network-create
	-docker stop pgadmin4
	-docker rm pgadmin4
	docker run -d \
	--name pgadmin4 \
	--network crm-network \
	-p 5050:80 \
	-e PGADMIN_DEFAULT_EMAIL=admin@admin.com \
	-e PGADMIN_DEFAULT_PASSWORD=admin123 \
	dpage/pgadmin4

pgadmin-stop:
	docker stop pgadmin4

pgadmin-remove:
	docker rm pgadmin4

pgadmin-logs:
	docker logs -f pgadmin4

rabbitmq-up: network-create
	-docker stop rabbitmq
	-docker rm rabbitmq
	docker run -d \
	--name rabbitmq \
	--hostname rabbitmq \
	--network crm-network \
	-p 5672:5672 \
	-p 15672:15672 \
	-e RABBITMQ_DEFAULT_USER=admin \
	-e RABBITMQ_DEFAULT_PASS=admin123 \
	rabbitmq:3-management

rabbitmq-down:
	docker stop rabbitmq && docker rm rabbitmq

rabbitmq-logs:
	docker logs -f rabbitmq

infra-restart: postgres-up pgadmin-start rabbitmq-up