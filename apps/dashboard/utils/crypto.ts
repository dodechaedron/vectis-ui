import { makeSignDoc, serializeSignDoc, StdSignDoc } from '@cosmjs/amino';
import { Secp256k1, Secp256k1Signature, sha256 } from '@cosmjs/crypto';
import { fromBase64, toBase64, toUtf8 } from '@cosmjs/encoding';

export const makeADR036AminoDoc = (message: string, signerAddr: string, chainId: string): StdSignDoc => {
  return makeSignDoc(
    [
      {
        type: 'sign/MsgSignData',
        value: {
          signer: signerAddr,
          data: toBase64(toUtf8(message))
        }
      }
    ],
    { gas: '0', amount: [] },
    chainId,
    undefined,
    0,
    0
  );
};

export const verifyArbitrary = async (
  message: string,
  pubKey: Uint8Array,
  signature: string,
  signerAddr: string,
  chainId = ''
): Promise<void> => {
  const signBytes = serializeSignDoc(makeADR036AminoDoc(message, signerAddr, chainId));
  const messageHash = sha256(signBytes);
  const parsedSignature = Secp256k1Signature.fromFixedLength(fromBase64(signature));
  const result = await Secp256k1.verifySignature(parsedSignature, messageHash, pubKey);
  if (!result) throw new Error('Signature verification failed');
};
