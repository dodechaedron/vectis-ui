/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.26.0.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

export type BigNumberBytes = string;
export type WMap = [number[], BigNumberBytes][];
export type PointG1Bytes = string;
export type PointG2Bytes = string;
export type PointG1Bytes1 = string;
export type PointG1Bytes2 = string;
export type PointG1Bytes3 = string;
export type PointG1Bytes4 = string;
export type PointG2Bytes1 = string;
export type PointG1Bytes5 = string;
export type PointG1Bytes6 = string;
export type PointG2Bytes2 = string;
export type PointG2Bytes3 = string;
export interface InstantiateMsg {
  cred_def: WCredentialPubKey;
}
export interface WCredentialPubKey {
  p_key: WCredentialPrimaryPubKey;
  r_key?: WCredentialRevocationPubKey | null;
  [k: string]: unknown;
}
export interface WCredentialPrimaryPubKey {
  n: BigNumberBytes;
  r: WMap;
  rctxt: BigNumberBytes;
  s: BigNumberBytes;
  z: BigNumberBytes;
  [k: string]: unknown;
}
export interface WCredentialRevocationPubKey {
  g: PointG1Bytes;
  g_dash: PointG2Bytes;
  h: PointG1Bytes1;
  h0: PointG1Bytes2;
  h1: PointG1Bytes3;
  h2: PointG1Bytes4;
  h_cap: PointG2Bytes1;
  htilde: PointG1Bytes5;
  pk: PointG1Bytes6;
  u: PointG2Bytes2;
  y: PointG2Bytes3;
  [k: string]: unknown;
}
export interface ExecuteMsg {}
export type QueryMsg = 'credential_pub_key';
