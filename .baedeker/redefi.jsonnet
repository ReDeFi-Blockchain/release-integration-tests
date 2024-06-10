local
m = import 'baedeker-library/mixin/spec.libsonnet',
;

function(relay_spec)

local relay = {
	name: 'redefi-relay',
	bin: 'bin/polkadot-1.7',
	validatorIdAssignment: 'staking',
	spec: {Genesis:{
		chain: relay_spec,
		modify:: bdk.mixer([
			m.genericRelay($, hrmp = std.join([], [
		])),
		m.simplifyGenesisName(),
		{
			name: 'redefi',
			id: 'redefi',
			_code: cql.toHex(importbin '../redefi_runtime.compact.compressed.wasm'),
			_genesis+:{sudo::{}},
		},
		m.unsimplifyGenesisName(),
	]),
	}},
	nodes: {
		[name]: {
			bin: 'bin/redefi-relay',
			wantedKeys: 'relay',
			extraArgs: [
      			'--blocks-pruning=archive',
				'--state-pruning=archive',
    		],
		},
		for name in ['alice', 'bob', 'charlie', 'dave', 'eve', 'ferdie']
	}
};

relay 