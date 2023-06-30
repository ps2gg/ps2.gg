import { HttpException } from '@nestjs/common'

export function validateNumericString(value: string, target: string): void {
  if (!/^\d+(\.\d+)*$/.test(value)) {
    throw new ValidationException(`Expected ${target} to be a numeric string`)
  }
}

export function validateCharacterId(value: string): void {
  validateNumericString(value, 'characterId')
  if (value.length !== 19) {
    throw new ValidationException('Expected characterId to be 19 characters long')
  }
}

export function validateCharacterName(value: string): void {
  if (value.length < 3 || value.length > 32 || /[^a-zA-Z0-9-]$/.test(value)) {
    throw new ValidationException('Expected the character name to be 3-32 character alphanumeric string')
  }
}

export function validateULID(value: string): void {
  if (!/^[0-9A-Z]{26}$/.test(value)) {
    throw new ValidationException('Expected ulid to be a 26 character alphanumeric string')
  }
}

export function validateSnowflake(value: string): void {
  validateNumericString(value, 'snowflake')
  if (value.length > 18) {
    throw new ValidationException('Expected snowflake to be no longer than 18 characters')
  }
}

export function validateObjectNotation(value: string, target: string): void {
  if (!/^[a-zA-Z0-9.]+$/.test(value)) {
    throw new ValidationException(`Expected ${target} to be alphanumeric with periods`)
  }
}

export class ValidationException extends HttpException {
  constructor(message: string) {
    super(message, 400)
  }
}
