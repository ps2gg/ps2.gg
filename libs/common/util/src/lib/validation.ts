export function validateNumericString(value: string, target: string): void {
  if (!/^\d+$/.test(value)) {
    throw new Error(`Expected ${target} to be a numeric string`)
  }
}

export function validateCharacterId(value: string): void {
  validateNumericString(value, 'characterId')
  if (value.length !== 19) {
    throw new Error('Expected characterId to be 19 characters long')
  }
}

export function validateULID(value: string): void {
  if (!/^[0-9A-Z]{26}$/.test(value)) {
    throw new Error('Expected ulid to be a 26 character alphanumeric string')
  }
}
