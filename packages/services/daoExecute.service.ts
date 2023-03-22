import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { DAOQueryService } from "./daoQuery.service";
import { ExecuteMsg } from "@vectis/types/Factory.types";

export class DAOExecuteService {
  constructor(readonly queryClient: DAOQueryService, readonly client: SigningCosmWasmClient, readonly userAddr: string) {}

  static async connectWithSigner(
    daoQueryService: DAOQueryService,
    signer: OfflineSigner,
    network: { gasPrice: string; feeToken: string; rpcUrl: string }
  ): Promise<DAOExecuteService> {
    const [{ address }] = await signer.getAccounts();
    const signingClient = await SigningCosmWasmClient.connectWithSigner(network.rpcUrl, signer, {
      gasPrice: GasPrice.fromString(`${network.gasPrice}${network.feeToken}`),
    });
    return new DAOExecuteService(daoQueryService, signingClient, address);
  }
}
