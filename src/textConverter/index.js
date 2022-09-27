const fs = require("fs");
const txtConverter = require("./txtConverter");
const mdConverter = require("./mdConverted");

const textConverter = (inputFilepath) => {
  let result;
  let storyTitle;

  if (inputFilepath.endsWith(".txt")) {
    ({ result, storyTitle } = txtConverter(inputFilepath));
  } else if (inputFilepath.endsWith(".md")) {
    ({ result, storyTitle } = mdConverter(inputFilepath));
  } else {
    throw new Error("The file provided is not a txt or md file");
  }

  // Used to only keep the file name that is needed when the file are under a directories
  const outputFileName = inputFilepath
    .substring(inputFilepath.lastIndexOf("/") + 1)
    .replace(/\.(txt|md)$/, ".html");

  // Opening the file and add all of the array values line by line
  const file = fs.createWriteStream(
    `./${process.env.OUTPUT_DIRECTORY}/${outputFileName}`
  );

  file.write(
    `<!doctype html>\n<html lang="${
      process.env.HTML_LANGUAGE
    }">\n\n<head>\n\t<meta charset="utf-8">\n\t<title>${
      storyTitle || "FileName"
    }</title>\n\t<meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body>\n\n`
  );

  file.write(result);

  file.write("\n</body>\n</html>");
  file.end();
};

module.exports = textConverter;
