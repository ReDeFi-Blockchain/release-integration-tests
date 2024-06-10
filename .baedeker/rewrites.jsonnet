local dotenv = {
  [std.splitLimit(line, '=', 2)[0]]: std.splitLimit(line, '=', 2)[1]
  for line in std.split(importstr '../.env', '\n')
  if line != ''
  if std.member(line, '=')
};

function(prev, repoDir)
  (import 'baedeker-library/ops/rewrites.libsonnet').rewriteNodePaths({
    'bin/redefi-relay': { dockerImage: 'redefi-relay:latest' },
    'bin/polkadot-1.7': { dockerImage: 'parity/polkadot:v1.7.0' },
  }, extra_node_mixin={
    extraArgs+: [
      '-lxcm=trace',
      '-lmapping-sync=trace,fc-db=trace',
    ],
  },)(prev)
