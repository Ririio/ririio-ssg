const {
  createNavBarDiv,
  createCard,
  convertExtension,
  textConverter,
} = require('../text-converter/index')

test('text converter', () => {
  const wrongFileExtension = () => {
    textConverter('main.js')
  }

  expect(wrongFileExtension).toThrow()
})

test('create navigation bar', () => {
  expect(
    createNavBarDiv(['Silver Blaze.html', 'The Naval Treaty.html'])
  ).toMatch(/Silver Blaze|The Naval Treaty/i)
})

test('create card', () => {
  expect(createCard(['Silver Blaze.html', 'The Naval Treaty.html'])).toMatch(
    /Silver Blaze|The Naval Treaty/i
  )
})

test('convert extension', () => {
  expect(convertExtension('Silver Blaze.txt')).toMatch(/Silver Blaze.html/i)
})
