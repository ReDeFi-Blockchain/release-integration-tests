# Load environment variables from .env file
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

# Define Docker image tags
RELAY_IMAGE_TAG = redefi-relay
RELAY_RUNTIME_IMAGE_TAG = redefi-relay-runtime
PARACHAIN_IMAGE_TAG = redefi-parachain

# Define the Docker build arguments
RELAY_BRANCH ?= $(REDEFI_RELAY_MAINNET_VERSION)
RELAY_RUNTIME_BRANCH ?= $(REDEFI_RELAY_RUNTIME_MAINNET_VERSION)
PARACHAIN_BRANCH ?= $(REDEFI_PARACHAIN_MAINNET_VERSION)

# Define paths
BAEDEKER_URL = https://github.com/UniqueNetwork/baedeker/releases/download/v0.1.2/baedeker
BAEDEKER_BIN = ./baedeker
BAEDEKER_LIB_REPO = https://github.com/UniqueNetwork/baedeker-library
BAEDEKER_LIB_PATH = .baedeker/vendor/baedeker-library

.PHONY: all install_direnv download_baedeker download_baedeker_library build_relay_node pull_polkadot build_relay_runtime copy_runtime_wasm build_parachain run stop clean log_branches pause

all: log_branches pause install_direnv download_baedeker download_baedeker_library build_relay_node pull_polkadot build_relay_runtime copy_runtime_wasm build_parachain run

log_branches:
	@echo "Building with the following branches:"
	@echo "REDEFI_RELAY_MAINNET_VERSION: $(RELAY_BRANCH)"
	@echo "REDEFI_RELAY_RUNTIME_MAINNET_VERSION: $(RELAY_RUNTIME_BRANCH)"
	@echo "REDEFI_PARACHAIN_MAINNET_VERSION: $(PARACHAIN_BRANCH)"

pause:
	@sleep 3

install_direnv:
	direnv allow

download_baedeker:
	@rm -f $(BAEDEKER_BIN)
	curl -L $(BAEDEKER_URL) -o $(BAEDEKER_BIN) && chmod +x $(BAEDEKER_BIN)

download_baedeker_library:
	@rm -rf $(BAEDEKER_LIB_PATH)
	mkdir -p .baedeker/vendor && git clone $(BAEDEKER_LIB_REPO) $(BAEDEKER_LIB_PATH)

build_relay_node:
	docker build -f .docker/Dockerfile-relay -t $(RELAY_IMAGE_TAG) --build-arg="REDEFI_RELAY=$(RELAY_BRANCH)" .

pull_polkadot:
	docker pull parity/polkadot:v1.7.0

build_relay_runtime:
	docker build -f .docker/Dockerfile-relay-runtime -t $(RELAY_RUNTIME_IMAGE_TAG) --build-arg="REDEFI_RELAY_RUNTIME=$(RELAY_RUNTIME_BRANCH)" .

copy_runtime_wasm:
	docker run -v $$(pwd):/infra --rm --entrypoint cp $(RELAY_RUNTIME_IMAGE_TAG) /redefi/redefi_runtime.compact.compressed.wasm /infra/

build_parachain:
	docker build -f .docker/Dockerfile-parachain -t $(PARACHAIN_IMAGE_TAG) --build-arg="REDEFI_PARACHAIN=$(PARACHAIN_BRANCH)" .

run:
	.baedeker/up.sh .baedeker/redefi.jsonnet

stop:
	.baedeker/down.sh

clean: stop
	-docker rmi $(RELAY_IMAGE_TAG) $(RELAY_RUNTIME_IMAGE_TAG) $(PARACHAIN_IMAGE_TAG)
	-docker system prune -f
	-rm -f $(BAEDEKER_BIN)
	-rm -rf $(BAEDEKER_LIB_PATH)
