# redefi-infra

## How to use it locally

1. Install [direnv](https://direnv.net/). Then run:

    ```
    direnv allow 
    ```

2. Download and add to path `baedeker` :

    ```
    curl -L https://github.com/UniqueNetwork/baedeker/releases/download/v0.1.0-rc1/baedeker -o baedeker && chmod +x baedeker
    ```

3. Download baedeker library:

    ```
    mkdir -p .baedeker/vendor && git clone https://github.com/UniqueNetwork/baedeker-library .baedeker/vendor/baedeker-library
    ```

4. Build Docker image:

    ```
    docker build -t redefi-relay --build-arg="RUST_TOOLCHAIN=nightly-2023-11-16" .
    ```

5. Pull polkadot image from official repository:

    ```
    docker pull parity/polkadot:v1.7.0
    ```
    *This step is required until the node version reaches 1.7.0 or higher. After that you can make changes to redefi.jsonnet and rewrites.jsonnet files, and eliminate this step.* 

6. Build runtime image:
   
    ```
    docker build -f Dockerfile-runtime -t redefi-relay-runtime --build-arg="RUST_TOOLCHAIN=nightly-2023-11-16" .
    ```
    
7. Copy runtime wasm file to host:
    ```
    docker run -v $PWD:/infra --rm --entrypoint cp redefi-relay-runtime /redefi/redefi_runtime.compact.compressed.wasm /infra/compiles/
    ```

8. Run:

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
