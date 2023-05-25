import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Example } from '@ps2gg/friends/types'
import { ExampleEntity } from '../../domain/Entity/ExampleEntity'
import { ExampleRepository } from '../../infrastructure/TypeOrm/Repository/ExampleRepository'

export class SetExample {
  constructor(readonly example: Example) {}
}

@CommandHandler(SetExample)
export class SetExampleHandler implements ICommandHandler<SetExample, ExampleEntity> {
  constructor(private _repository: ExampleRepository) {}

  async execute(command: SetExample): Promise<ExampleEntity> {
    return this._repository.save(command.example)
  }
}
