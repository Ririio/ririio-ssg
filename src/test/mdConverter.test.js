const { processLine } = require('../text-converter/mdConverted')

describe('mark down converter process line', () => {
  test('for heading', () => {
    expect(processLine('# Hello world!')).toMatch(/<h1>/)
  })

  test('for italic', () => {
    expect(processLine('_Hello world!_')).toMatch(/<i>/)
  })

  test('for bold', () => {
    expect(processLine('**Hello world!**')).toMatch(/<b>/)
  })

  test('for url', () => {
    expect(processLine('[url](https://google.com)')).toMatch(/[.*](.*)/)
  })
})
