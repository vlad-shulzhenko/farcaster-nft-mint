import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit/frame";

export class CoinbaseKit {
  public static validateMessage = async (body: FrameRequest) => {
    const { isValid, message } = await getFrameMessage(body);

    return { isValid, message };
  }
}
