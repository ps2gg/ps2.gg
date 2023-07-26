class MessageCoordinator {
  private _queue: any[] = []

  constructor() {
    this._purgeDeadMessages()
  }

  private _purgeDeadMessages(): void {
    setInterval(() => {
      const now = new Date()
      this._queue = this._queue.filter((item) => {
        const isObsolete = now.getTime() - item.createdAt.getTime() > 1000 * 60 * 10

        if (isObsolete) item.reject(false)
        return !isObsolete
      })
    }, 1000 * 60 * 10)
  }

  async awaitInteraction(messageId: string): Promise<boolean> {
    let resolve, reject
    const promise = new Promise<boolean>((res, rej) => {
      resolve = res
      reject = rej
    })
    this._queue.push({ messageId, resolve, reject, createdAt: new Date() })
    return promise
  }

  completeInteraction(messageId): void {
    const interaction = this._queue.find((item) => item.messageId === messageId)

    if (!interaction) return // has been purged

    interaction.resolve(true)
  }
}

export const messageCoordinator = new MessageCoordinator()
