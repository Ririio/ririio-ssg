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

describe('create navigation bar', () => {
  test('passing array', () => {
    expect(
      createNavBarDiv(['Silver Blaze.html', 'The Naval Treaty.html'])
    ).toMatch(/Silver Blaze|The Naval Treaty/i)
  })

  test('passing non array', () => {
    const nonArrayValue = () => {
      createNavBarDiv('')
    }

    expect(nonArrayValue).toThrow()
  })
})

describe('create card', () => {
  test('passing array', () => {
    expect(createCard(['Silver Blaze.html', 'The Naval Treaty.html'])).toMatch(
      /Silver Blaze|The Naval Treaty/i
    )
  })

  test('passing non array', () => {
    const nonArrayValue = () => {
      createCard('')
    }
    expect(nonArrayValue).toThrow()
  })
})

describe('convert extension', () => {
  test('passing string', () => {
    expect(convertExtension('Silver Blaze.txt')).toMatch(/Silver Blaze.html/i)
  })

  test('passing numb', () => {
    const nonStringValue = () => {
      convertExtension(123)
    }
    expect(nonStringValue).toThrow()
  })

  test('passing array', () => {
    const nonStringValue = () => {
      convertExtension(['this', 'a', 'test'])
    }
    expect(nonStringValue).toThrow()
  })
})
