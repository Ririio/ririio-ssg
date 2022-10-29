require('dotenv').config()
const fs = require('fs')
const { readFileEnv } = require('./src/text-converter')

module.exports = {
  // Function used to convert all .txt files into a .html
  createFolder: (outputFolder) => {
    // Check if the folder given exists before creating a new one

    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder)
    } else {
      // Forcefully deletes the original folder and its content before creating a new one
      fs.rmSync(outputFolder, { recursive: true, force: true })
      fs.mkdirSync(outputFolder)
    }
  },
  replaceDirectory: (str) => {
    readFileEnv('OUTPUT_DIRECTORY', 'Renamed output directory to', str)
  },
  changeLanguage: (str) => {
    readFileEnv('HTML_LANGUAGE', 'Replaced current language to', str)
  },
}
