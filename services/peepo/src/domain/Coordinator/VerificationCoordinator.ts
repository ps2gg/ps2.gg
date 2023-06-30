class VerificationCoordinator {
  private _queue: any[] = []

  constructor() {
    this._purgeDeadVerifications()
  }

  private _purgeDeadVerifications(): void {
    setInterval(() => {
      const now = new Date()
      this._queue = this._queue.filter((item) => {
        const isObsolete = now.getTime() - item.createdAt.getTime() > 1000 * 60 * 1 // TODO: reset to 5 minutes

        if (isObsolete) item.reject(false)
        return !isObsolete
      })
    }, 1000 * 60 * 1)
  }

  async awaitVerification(discordId: string, characterId: string): Promise<boolean> {
    let resolve, reject
    const promise = new Promise<boolean>((res, rej) => {
      resolve = res
      reject = rej
    })
    this._queue.push({ discordId, characterId, resolve, reject, createdAt: new Date() })
    return promise
  }

  completeVerification(discordId: string, characterId: string): void {
    const verification = this._queue.find((item) => item.discordId === discordId && item.characterId === characterId)

    if (!verification) return // has been purged

    verification.resolve(true)
  }
}

export const verificationCoordinator = new VerificationCoordinator()
