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
})
