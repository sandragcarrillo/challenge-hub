import { test } from "@sentio/sdk"
import { handleChallengeCreated } from "./processor.js"

test("handleChallengeCreated", async (ctx) => {
  const event = {
    params: {
      creator: "0x123",
      challengeIndex: 1,
      name: "Test Challenge",
      hint: "Test Hint",
      merkleRoot: "0xabc",
      maxWinners: 10,
      metadata: "Test Metadata",
    },
    transaction: {
      value: "1000000000000000000", // 1 ETH en wei
    },
  }
  await handleChallengeCreated(event, ctx)
})
