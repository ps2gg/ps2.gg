import { sanitizeCharacterName, sanitizeObjectNotation } from './sanitization'

describe('sanitizeCharacterName', () => {
  it('should remove all non-alphanumeric and hyphen characters from the input string', () => {
    const input = 'My!@#Name$%^Is&*(John)-_Doe'
    const expectedOutput = 'MyNameIsJohn-Doe'
    const actualOutput = sanitizeCharacterName(input)
    expect(actualOutput).toEqual(expectedOutput)
  })
})

describe('sanitizeObjectNotation', () => {
  it('should remove all non-word characters except for periods', () => {
    const input = 'my_object-name!.is.@very.#cool.$indeed.32432'
    const expectedOutput = 'my_object.name.is.very.cool.indeed.32432'
    const actualOutput = sanitizeObjectNotation(input)
    expect(actualOutput).toEqual(expectedOutput)
  })
})
