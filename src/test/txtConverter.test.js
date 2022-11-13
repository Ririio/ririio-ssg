const path = require('path')
const txtConverter = require('../text-converter/txtConverter')

describe('text converter', () => {
  test('with title', () => {
    expect(txtConverter('text-files/Silver Blaze.txt')).toMatchObject({
      storyTitle: /Silver Blaze/,
      result: /[a-zA-Z]]/,
    })
  })

  test('without title', () => {
    expect(txtConverter('text-files/test.md')).toMatchObject({
      storyTitle: /.md/,
      result: /[a-z-A-Z]/,
    })
  })

  test('processed text match snapshot', () => {
    const testFileName = path.join(
      __dirname,
      '../../text-files/Silver Blaze.txt'
    )
    expect(txtConverter(testFileName)).toMatchSnapshot()
  })
})
