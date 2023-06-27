export function validateNumericString(value: string, target: string): void {
  if (typeof value !== 'string' || isNaN(parseFloat(value))) {
    throw new Error(`Expected ${target} to be a numeric string`)
  }
}

export function validateCharacterId(value: string): void {
  validateNumericString(value, 'characterId')
  if (value.length !== 19) {
    throw new Error('Expected characterId to be 19 characters long')
  }
}
