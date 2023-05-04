import { toUtf8 } from '@cosmjs/encoding';

import { BigNumberBytes, WCredentialPrimaryPubKey, WCredentialPubKey, WMap } from '~/interfaces/identity';

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function toBigNumberBytes(s: string | any): BigNumberBytes {
  return s as string;
}

export function toWMap(e: {}): WMap {
  // export type WMap = [number[], BigNumberBytes][];
  let w_map: WMap = [];
  Object.entries(e).forEach(([key, value]) => {
    w_map.push([Array.from(toUtf8(key)), toBigNumberBytes(value)]);
  });
  return w_map;
}

export function parseCredPubKey(input: string): WCredentialPubKey {
  const cpk = JSON.parse(input);
  const pkey = cpk.p_key;
  const p_key: WCredentialPrimaryPubKey = {
    n: toBigNumberBytes(pkey.n),
    r: toWMap(pkey.r),
    rctxt: toBigNumberBytes(pkey.rctxt),
    s: toBigNumberBytes(pkey.s),
    z: toBigNumberBytes(pkey.z)
  };
  return {
    p_key
  };
}
