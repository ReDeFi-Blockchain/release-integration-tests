local
m = import 'baedeker-library/mixin/spec.libsonnet',
;

function(relay_spec)

local l1 = {
	name: 'l1',
	bin: 'bin/polkadot',
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
			properties: {
				tokenDecimals: 18,
				tokenSymbol: "BAX"
			},
			_code: cql.toHex(importbin '../redefi_runtime.compact.compressed.wasm'),
		},
		m.unsimplifyGenesisName(),
		]),
	}},
	nodes: {
		[name]: {
			bin: 'bin/redefi-relay',
			wantedKeys: 'l1',
			extraArgs: [
      			'--blocks-pruning=archive',
				'--state-pruning=archive',
    		],
		},
		for name in ['alice', 'bob', 'charlie', 'dave', 'eve', 'ferdie']
	}
};

local l2 = {
	name: 'l2',
	bin: 'bin/redefi-collator',
	paraId: 2001,
	spec: {Genesis:{
		modify:: m.genericPara($),
	}},
	nodes: {
		[name]: {
			bin: $.bin,
			wantedKeys: 'para',
		},
		for name in ['alice', 'bob', 'charlie']
	},
};

l1 + {
	parachains: {
		[para.name]: para,
		for para in [l2]
	},
}