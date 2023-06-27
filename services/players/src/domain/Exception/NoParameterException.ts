import { HttpException, HttpStatus } from '@nestjs/common'

export class NoParameterException extends HttpException {
  constructor() {
    super(`Missing value for characterId or name`, HttpStatus.BAD_REQUEST)
  }
}
