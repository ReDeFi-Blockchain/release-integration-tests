# redefi-infra

## How to use it locally
1. Install last version of docker & docker compose plugin.

2. Install [direnv](https://direnv.net/). Then run:

    ```
    direnv allow 
    ```

3. Download and add to path `baedeker` :

    ```
    curl -L https://github.com/UniqueNetwork/baedeker/releases/download/v0.1.2/baedeker -o baedeker && chmod +x baedeker
    ```

4. Download baedeker library:

    ```
    mkdir -p .baedeker/vendor && git clone https://github.com/UniqueNetwork/baedeker-library .baedeker/vendor/baedeker-library
    ```

5. Build Relay Node Docker image:

    ```
    docker build -f .docker/Dockerfile-relay -t redefi-relay --build-arg="REDEFI_RELAY=main" .
    ```

6. Pull polkadot image from official repository:

    ```
    docker pull parity/polkadot:v1.7.0
    ```

    *This step is required until the node version reaches 1.7.0 or higher. After that you can make changes to redefi.jsonnet and rewrites.jsonnet files, and eliminate this step.* 

7. Build Relay Runtime image:
   
    ```
    docker build -f .docker/Dockerfile-relay-runtime -t redefi-relay-runtime --build-arg="REDEFI_RELAY_RUNTIME=main" .
    ```
    
8. Copy runtime wasm file to host:
    
    ```
    docker run -v $PWD:/infra --rm --entrypoint cp redefi-relay-runtime /redefi/redefi_runtime.compact.compressed.wasm /infra/
    ```

9. Build Parachain Docker image:

    ```
    docker build -f .docker/Dockerfile-parachain -t redefi-parachain --build-arg="REDEFI_PARACHAIN=main" .
    ```

10. Run:

    ```
    .baedeker/up.sh .baedeker/redefi.jsonnet
    ```

Аfter that u should see in the terminal something like this:

```
Baedeker env updated
Enjoy your baedeker networks at <http://127.0.0.1:9699/>
direnv: export +BDK_BALANCER +REDEFI_RELAY_HTTP_URL +REDEFI_RELAY_URL
```

To disable the infrastructure run:

```
.baedeker/down.sh
```