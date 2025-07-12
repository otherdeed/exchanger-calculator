dev:
	docker compose -f ./docker-compose.dev.yml down --remove-orphans \
	&& docker compose -f ./docker-compose.dev.yml build --pull \
	&& docker compose -f ./docker-compose.dev.yml run --rm frontend yarn install \
	&& docker compose -f ./docker-compose.dev.yml up -d

dev-restart:
	docker compose -f ./docker-compose.dev.yml down --remove-orphans \
	&& docker compose -f ./docker-compose.dev.yml up -d

dev-down:
	docker compose -f ./docker-compose.dev.yml down --remove-orphans

dev-install:
	docker compose -f ./docker-compose.dev.yml run --rm frontend yarn install

dev-add:
	docker compose -f ./docker-compose.dev.yml run --rm frontend yarn add ${p}

dev-rm:
	docker compose -f ./docker-compose.dev.yml run --rm frontend yarn remove ${p}

prod:
	docker compose -f ./docker-compose.yml build --pull \
	&& docker compose -f ./docker-compose.yml down --remove-orphans \
	&& docker compose -f ./docker-compose.yml up -d

prod-down:
	docker compose -f ./docker-compose.yml down --remove-orphans
