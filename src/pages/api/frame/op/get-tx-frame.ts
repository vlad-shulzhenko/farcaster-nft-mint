import { NextApiRequest, NextApiResponse } from "next";
import { CoinbaseKit } from "@/classes/CoinbaseKit";
import { FrameRequest } from "@coinbase/onchainkit/frame";
import { getErc721PreparedEncodedData, getFarcasterAccountAddress } from "@/utils/tx-frame";
import { erc721ContractABI } from "@/utils/erc721ContractABI";
import { erc721ContractAddress } from "@/utils/constants";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { isValid, message } = await CoinbaseKit.validateMessage(req.body as FrameRequest);

  if (!isValid || !message) {
    res.status(400).json({ error: 'Invalid request' });
  }

  if (message) {
    const accountAddress = await getFarcasterAccountAddress(message.interactor);

    const data = await getErc721PreparedEncodedData(accountAddress);

    return res.status(200).json({
      chainId: "eip155:10",
      method: "eth_sendTransaction",
      params: {
        abi: erc721ContractABI,
        to: erc721ContractAddress,
        data,
        value: "0",
      }
    })
  }
}
