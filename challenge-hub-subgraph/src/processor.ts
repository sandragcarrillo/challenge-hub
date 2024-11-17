import { ChallengeCreated, PrizeClaimed, ChallengeInvalidated } from "../generated/CuriosChallenge/CuriosChallenge"
import { Challenge } from "../generated/schema"

export function handleChallengeCreated(event: ChallengeCreated): void {
  let entity = new Challenge(event.params.challengeIndex.toHex())
  entity.creator = event.params.creator
  entity.index = event.params.challengeIndex
  entity.name = event.params.name
  entity.hint = event.params.hint
  entity.merkleRoot = event.params.merkleRoot
  entity.maxWinners = event.params.maxWinners
  entity.metadata = event.params.metadata
  entity.valid = true
  entity.prizePool = event.transaction.value
  entity.save()
}

export function handlePrizeClaimed(event: PrizeClaimed): void {
  let entity = Challenge.load(event.params.challengeIndex.toHex())
  if (entity) {
    entity.prizePool = entity.prizePool.minus(event.params.prize)
    entity.save()
  }
}

export function handleChallengeInvalidated(event: ChallengeInvalidated): void {
  let entity = Challenge.load(event.params.challengeIndex.toHex())
  if (entity) {
    entity.valid = false
    entity.save()
  }
}
