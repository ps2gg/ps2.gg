import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ExampleEntity } from '../../domain/Entity/ExampleEntity'
import { ExampleRepository } from '../../infrastructure/TypeOrm/Repository/ExampleRepository'

export class GetExample {
  constructor(readonly id: string) {}
}

@QueryHandler(GetExample)
export class GetExampleHandler implements IQueryHandler<GetExample, ExampleEntity> {
  constructor(private readonly _repository: ExampleRepository) {}

  async execute(query: GetExample): Promise<ExampleEntity> {
    return this._repository.findOne(query.id)
  }
}
