import { validateNumericString, validateCharacterId, validateCharacterName, validateULID, validateSnowflake } from './validation'

describe('validateNumericString', () => {
  it('should not throw an error for a valid numeric string', () => {
    expect(() => validateNumericString('123', 'test')).not.toThrow()
    expect(() => validateNumericString('123.456', 'test')).not.toThrow()
  })

  it('should throw an error for an invalid numeric string', () => {
    expect(() => validateNumericString('abc', 'test')).toThrow()
    expect(() => validateNumericString('123.', 'test')).toThrow()
    expect(() => validateNumericString('123.abc', 'test')).toThrow()
  })
})

describe('validateCharacterId', () => {
  it('should not throw an error for a valid character ID', () => {
    expect(() => validateCharacterId('1234567890123456789')).not.toThrow()
  })

  it('should throw an error for an invalid character ID', () => {
    expect(() => validateCharacterId('123')).toThrow()
    expect(() => validateCharacterId('123456789012345678')).toThrow()
    expect(() => validateCharacterId('12345678901234567890')).toThrow()
    expect(() => validateCharacterId('abc')).toThrow()
  })
})

describe('validateCharacterName', () => {
  it('should not throw an error for a valid character name', () => {
    expect(() => validateCharacterName('abc123')).not.toThrow()
    expect(() => validateCharacterName('a-b-c_123')).not.toThrow()
    expect(() => validateCharacterName('a'.repeat(32))).not.toThrow()
  })

  it('should throw an error for an invalid character name', () => {
    expect(() => validateCharacterName('ab')).toThrow()
    expect(() => validateCharacterName('a'.repeat(33))).toThrow()
    expect(() => validateCharacterName('abc!')).toThrow()
  })
})

describe('validateULID', () => {
  it('should not throw an error for a valid ULID', () => {
    expect(() => validateULID('01AC9M1ZP7B9G8FV6HJ3K2QWES')).not.toThrow()
  })

  it('should throw an error for an invalid ULID', () => {
    expect(() => validateULID('01AC9M1ZP7B9G8FV6HJ3K2QWE')).toThrow()
    expect(() => validateULID('01AC9M1ZP7B9G8FV6HJ3K2QWES!')).toThrow()
  })
})

describe('validateSnowflake', () => {
  it('should not throw an error for a valid snowflake', () => {
    expect(() => validateSnowflake('123456789012345678')).not.toThrow()
  })

  it('should throw an error for an invalid snowflake', () => {
    expect(() => validateSnowflake('123')).toThrow()
    expect(() => validateSnowflake('1234567890123456789')).toThrow()
    expect(() => validateSnowflake('abc')).toThrow()
  })
})
