export function validateNumericString(value: string, target: string): void {
  if (!/^\d+(\.\d+)*$/.test(value)) {
    throw new Error(`Expected ${target} to be a numeric string`)
  }
}

export function validateCharacterId(value: string): void {
  validateNumericString(value, 'characterId')
  if (value.length !== 19) {
    throw new Error('Expected characterId to be 19 characters long')
  }
}

export function validateCharacterName(value: string): void {
  if (value.length < 3 || value.length > 32 || /[^a-zA-Z0-9-]$/.test(value)) {
    throw new Error('Expected the character name to be 3-32 character alphanumeric string')
  }
}

export function validateULID(value: string): void {
  if (!/^[0-9A-Z]{26}$/.test(value)) {
    throw new Error('Expected ulid to be a 26 character alphanumeric string')
  }
}

export function validateSnowflake(value: string): void {
  validateNumericString(value, 'snowflake')
  if (value.length > 18) {
    throw new Error('Expected snowflake to be 18 characters long')
  }
}
