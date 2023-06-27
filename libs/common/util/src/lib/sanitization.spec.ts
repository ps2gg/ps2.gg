import { sanitizeCharacterName } from './sanitization'

describe('sanitizeCharacterName', () => {
  it('should remove all non-alphanumeric and hyphen characters from the input string', () => {
    const input = 'My!@#Name$%^Is&*(John)-_Doe'
    const expectedOutput = 'MyNameIsJohn-Doe'
    const actualOutput = sanitizeCharacterName(input)
    expect(actualOutput).toEqual(expectedOutput)
  })
})
