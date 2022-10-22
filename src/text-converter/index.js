const fs = require("fs");
const txtConverter = require("./txtConverter");
const mdConverter = require("./mdConverted");

module.exports = {
  textConverter: (inputFilepath, navLinks) => {
    let result;
    let storyTitle;
    let linksArr;

    if (navLinks) linksArr = navLinks.split(",");

    if (inputFilepath.endsWith(".txt")) {
      ({ result, storyTitle } = txtConverter(inputFilepath));
    } else if (inputFilepath.endsWith(".md")) {
      ({ result, storyTitle } = mdConverter(inputFilepath));
    } else {
      throw new Error("The file provided is not a txt or md file");
    }

    // Used to only keep the file name that is needed when the file are under a directories
    const outputFileName = module.exports.convertExtension(inputFilepath);

    // Opening the file and add all of the array values line by line
    const file = fs.createWriteStream(
      `./${process.env.OUTPUT_DIRECTORY}/${outputFileName}`
    );

    file.write(
      `<!doctype html>\n<html lang="${
        process.env.HTML_LANGUAGE
      }">\n\n<head>\n\t<meta charset="utf-8">\n\t${
        navLinks
          ? '<link rel="stylesheet" type="text/css" href="../src/utils/nav.css">'
          : ""
      }
      <title>${
        storyTitle || "FileName"
      }</title>\n\t<meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body>\n\n
      ${navLinks ? module.exports.createNavBarDiv(linksArr, file) : ""}
      ${result}\n</body>\n</html>
      `
    );

    file.end();
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

      <body>
      ${module.exports.createNavBarDiv(linksArr)}
      </body>
      `
    );
    file.end();
  },
  createNavBarDiv: (arr) => {
    let str = '<div class="sidenav">';

    arr.forEach((link) => {
      let name = link.substring(0, link.lastIndexOf(".") || filename);
      if (link) str += `<a href="${link}"> ${name} </a><hr />`;
    });
    str += "</div>";
    return str;
  },
  convertExtension: (str) => {
    const outputFileName = str
      .substring(str.lastIndexOf("/") + 1)
      .replace(/\.(txt|md)$/, ".html");
    return outputFileName;
  },
  //Lab 3: Created a function to prevent repetition when changing key-pair values
  readFileEnv: (key, msg, str) => {
    let result = fs.readFileSync("./.env", { encoding: "utf8", flag: "r" });

    if (key == "HTML_LANGUAGE")
      result = result.replace(process.env.HTML_LANGUAGE, str);
    else if (key == "OUTPUT_DIRECTORY")
      result = result.replace(process.env.OUTPUT_DIRECTORY, str);
    fs.writeFileSync("./.env", result);

    console.log(msg + " " + str);
  },
};

//Remove repetition when working with .env files
