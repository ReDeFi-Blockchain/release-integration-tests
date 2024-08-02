# ReDeFi integration tests

## Setup

1. Create `.env` from `.env-example`
2. Install dependencies and compile contracts: `yarn install && yarn compile`
3. Run a script that setup balances and configure XCM: `yarn test:setup`

## Run

To run tests use commands `yarn test:regular` and `yarn test:serial`.

Running all tests takes a long time. To quickly check that a relay or parachain is working, use `yarn test:smoke`.

If you're preparing a new release that changes the consensus, run `yarn test:stability`.

For debugging through VSCode use `yarn test:hh`

## Utilities

Format all code in repository: `yarn codestyle`.

Check code errors: `yarn lint`.
