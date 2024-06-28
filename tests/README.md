# ReDeFi integration tests

## Setup

1. Create `.env` from `.env-example`
2. Install dependencies and compile contracts: `yarn install && yarn compile`
3. Run a script that setup balances and configure XCM: `yarn test:setup`

## Run

If you want to run all tests in parallel, run `yarn test`. Some tests that used
sudo account may fail.

To avoid tests fails recommended to run tests first `yarn test:regular`, then `yarn test:serial`.

Running all tests takes a long time. To quickly check that a relay or parachain is working, use `yarn test:smoke`.

For debugging through VSCode use `yarn test:hh`

## Utilities

Format all code in repository: `yarn codestyle`.

Check code errors: `yarn lint`.
