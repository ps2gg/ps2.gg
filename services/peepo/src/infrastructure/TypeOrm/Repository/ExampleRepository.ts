import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Example } from '@ps2gg/peepo/types'
import { Repository } from 'typeorm'
import { ExampleEntity } from '../../../domain/Entity/ExampleEntity'

@Injectable()
export class ExampleRepository {
  constructor(@InjectRepository(ExampleEntity) private readonly _repository: Repository<ExampleEntity>) {}

  async findOne(id: string): Promise<ExampleEntity | null> {
    return this._repository.findOne({
      where: { id },
    })
  }

  async save(example: Example): Promise<ExampleEntity> {
    return this._repository.save(example)
  }
}
