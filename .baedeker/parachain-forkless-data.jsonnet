local
m = import 'baedeker-library/mixin/spec.libsonnet',
rm = import 'baedeker-library/mixin/raw-spec.libsonnet',
;

function(relay_spec, forked_spec, fork_source)

local relay = {
	name: 'redefi-relay',
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
			_code: cql.toHex(importbin '../redefi_runtime.compact.compressed.wasm'),
		},
		m.unsimplifyGenesisName(),
		]),
	}
		Raw:{
		local modifyRaw = bdk.mixer([
			rm.resetNetworking($),
			rm.decodeSpec(),
			rm.polkaLaunchPara($),
			rm.reencodeSpec(),
		]),
		raw_spec: modifyRaw({
			name: "Unused",
			id: "%s_local" % forked_spec,
			bootNodes: error "override me",
			chainType: error "override me",
			telemetryEndpoints: error "override me",
			codeSubstitutes: error "override me",
			relay_chain: "unused",
			genesis: {
				raw: {
					top: cql.chain(fork_source).latest._preloadKeys._raw,
					childrenDefault: {},
				},
			},
		}),
	}	
	
	},
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

local parachain = {
	name: 'redefi-parachain',
	bin: 'bin/redefi-collator',
	paraId: 1001,
	spec: {Genesis:{
		modify:: m.genericPara($),
	}},
	nodes: {
		[name]: {
			bin: $.bin,
			wantedKeys: 'para',
		},
		for name in ['alice', 'bob']
	},
};

relay + {
	parachains: {
		[para.name]: para,
		for para in [parachain]
	},
}