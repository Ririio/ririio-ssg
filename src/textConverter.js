const fs = require("fs");

const textConverter = (filename) => {
  const array = fs.readFileSync(filename).toString().split(/\r?\n/);

  if (!filename.includes(".txt"))
    throw new Error("The file provided is not a text file");

  let result = filename.replace(".txt", ".html");

  // Used to only keep the file name that is needed when the file are under a directories
  result = result.substring(result.lastIndexOf("/") + 1);

  let i = 0;
  let isValidTitle = false;
  let storyTitle;

  // Used to check if the 2nd and 3rd index contains a value to determine whether the first line is a title
  if (!array[1].trim().length && !array[2].trim()) {
    [storyTitle] = array;
    array[0] = `<h1>${array[0]}</h1>`;
    isValidTitle = true;
    i += 3;
  }

  // Go through a loop to look for the first portion of a sentence or a paragraph from the file
  for (i; i < array.length; ++i) {
    if (array[i].trim().length !== 0) {
      array[i] = `<p>${array[i]}`;

      // Keep looping until the value of the array after the current one is empty
      while (array[i].trim().length !== 0) {
        if (array[i + 1].trim().length === 0) {
          array[i] = `${array[i]}</p>`;
        }
        ++i;
      }
    }
  }

  // Opening the file and add all of the array values line by line
  const file = fs.createWriteStream(
    `./${process.env.OUTPUT_DIRECTORY}/${result}`
  );

  file.write(
    `<!doctype html>\n<html lang="en">\n\n<head>\n\t<meta charset="utf-8">\n\t<title>${
      isValidTitle ? storyTitle : "FileName"
    }</title>\n\t<meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body>\n\n`
  );

  file.write(array.join("\n"));

  file.write("\n</body>\n</html>");
  file.end();
};

module.exports = textConverter;
