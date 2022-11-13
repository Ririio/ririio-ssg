const path = require('path')
const { processLine, mdConverter } = require('../text-converter/mdConverted')

describe('mark down converter', () => {
  describe('Line processor', () => {
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

  test('processed markdown match snapshot', () => {
    const testFileName = path.join(__dirname, '../../text-files/test.md')
    expect(mdConverter(testFileName)).toMatchSnapshot()
  })
})
