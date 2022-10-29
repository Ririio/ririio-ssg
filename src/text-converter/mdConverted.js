const fs = require('fs')

const processLine = (line) => {
  let result = line

  // Alternative heading
  result = result.replaceAll(/# (.*) #/g, (match, label) => `<h1>${label}</h1>`)

  // italic
  result = result.replaceAll(/_(.*)_/g, (match, label) => `<i>${label}</i>`)

  // bold
  result = result.replaceAll(
    /\*\*(.*)\*\*/g,
    (match, label) => `<b>${label}</b>`
  )

  // url
  result = result.replaceAll(
    /\[(.+)\]\((.+)\)/g,
    (match, label, url) => `<a href="${encodeURI(url)}">${label}</a>`
  )

  // horizontal line
  result = result.replaceAll(/-{3,}/g, () => '<hr>')

  return result
}

const mdConverter = (inputFilepath) => {
  const lines = fs.readFileSync(inputFilepath, 'utf8').split(/\r?\n/)

  // Get title from filename
  const storyTitle = inputFilepath
    .substring(inputFilepath.lastIndexOf('/') + 1)
    .replace(/\.(txt)$/, '')

  return {
    storyTitle,
    result: lines.map(processLine).join('\n'),
  }
}

module.exports = mdConverter
