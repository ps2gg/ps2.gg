export function validateNumericString(value: string, target: string): void {
  if (typeof value !== 'string' || isNaN(parseFloat(value))) {
    throw new Error(`Expected ${target} to be a numeric string`)
  }
}
