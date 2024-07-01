import {readFile} from 'fs/promises';
import {u8aToHex} from '@polkadot/util';
import {blake2AsHex} from '@polkadot/util-crypto';
import SubHelper from '../utils/substrate';
import config from '../utils/config';

const main = async () => {
  const codePath = process.argv[2];
  if(!codePath) throw new Error('missing code path argument');

  const code = await readFile(codePath);
  const sub = await SubHelper.init(config.wsEndpointMain);
  const hex = blake2AsHex(code);

  // 1. authorize upgrade
  const parachainAuthorizeUpgradeTx = sub.api.tx.sudo.sudo(
    sub.api.tx.parachainSystem.authorizeUpgrade(hex, true),
  );

  await sub.utils.signAndSend(sub.sudo, parachainAuthorizeUpgradeTx);

  // 2. enact authorized upgrade
  const enactAuthorizedUpgradeTx = sub.api.tx.sudo.sudoUncheckedWeight(
    sub.api.tx.parachainSystem.enactAuthorizedUpgrade(u8aToHex(code)),
  );

  await sub.utils.signAndSend(sub.sudo, enactAuthorizedUpgradeTx);

  process.exit(0);
}

main().catch(e => {
  console.error("~~~~~~~~~~~~~~~~");
  console.error("Error while parachainAuthorizeEnactUpgrade.ts");
  console.error("~~~~~~~~~~~~~~~~");

  throw e;
})
