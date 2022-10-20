require("dotenv").config();
const { readFileEnv, createNavBarDiv } = require("./src/text-converter");
const fs = require("fs");

module.exports = {
  // Function used to convert all .txt files into a .html
  createFolder: (outputFolder) => {
    // Check if the folder given exists before creating a new one

    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    } else {
      // Forcefully deletes the original folder and its content before creating a new one
      fs.rmSync(outputFolder, { recursive: true, force: true });
      fs.mkdirSync(outputFolder);
    }
  },
  replaceDirectory: (str) => {
    readFileEnv("OUTPUT_DIRECTORY", "Renamed output directory to", str);
  },
  changeLanguage: (str) => {
    readFileEnv("HTML_LANGUAGE", "Replaced current language to", str);
  },
  createIndexFile: (outputFolder, fileLinks) => {
    const file = fs.createWriteStream(`./${outputFolder}/index.html`);
    let linksArr = fileLinks.split(",");

    file.write(
      `<!doctype html>\n
      <html lang="${process.env.HTML_LANGUAGE}">
      \n\n
      <head>\n\t<meta charset="utf-8">\n\t
        \n\t<meta name="viewport" content="width=device-width, initial-scale=1">\n
        <link rel="stylesheet" type="text/css" href="../src/utils/nav.css">
      </head>\n

      <body>\n\n
      `
    );
    createNavBarDiv(linksArr, file);

    file.write("</body>");
  },
};
