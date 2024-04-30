.PHONY: build-ui
build-ui:
	docker build -f ./docker/Dockerfile-ui . --tag web:latest

.PHONY: build-api
build-api:
	docker build -f ./docker/Dockerfile-api . --tag api:latest

.PHONY: push-ui
push-ui:
	echo "push"

.PHONY: push-api
push-api:
	echo "push"

.PHONY: deploy-ui
deploy-ui: build-ui push-ui

.PHONY: deploy-api
deploy-api: build-api push-api

.PHONY: build-ui-pnpm
build-ui-pnpm:
	docker build -f ./docker/Dockerfile-ui-pnpm . --tag web:pnpm

.PHONY: build-api-pnpm
build-api-pnpm:
	docker build -f ./docker/Dockerfile-api-pnpm . --tag api:pnpm

.PHONY: compose
compose:
	docker compose up -d --build

.PHONY: install
install:
	bash ./install.sh

.PHONY: run
run:
	bash ./run.sh

.PHONY: resetart
resetart:
	bash ./restart.sh

