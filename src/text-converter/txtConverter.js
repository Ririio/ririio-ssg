const fs = require("fs");

const txtConverter = (inputFilepath) => {
  const lines = fs.readFileSync(inputFilepath, "utf8").split(/\r?\n/);

  let storyTitle;
  let i = 0;

  // Used to check if the 2nd and 3rd index contains a value to determine whether the first line is a title
  if (!lines[1].trim().length && !lines[2].trim()) {
    [storyTitle] = lines;
    lines[0] = `<h1>${lines[0]}</h1>`;

    // Mark the first 3 lines as complete
    i += 3;
  }

  // If title was not found in the text, use the filename
  if (!storyTitle) {
    storyTitle = inputFilepath
      .substring(inputFilepath.lastIndexOf("/") + 1)
      .replace(/\.(txt)$/, "");
  }

  // Go through a loop to look for the first portion of a sentence or a paragraph from the file
  for (i; i < lines.length; ++i) {
    if (lines[i].trim().length) {
      lines[i] = `<p>${lines[i]}`;

      // Keep looping until the value of the line after the current one is empty
      while (lines[i].trim().length) {
        if (lines[i + 1].trim().length === 0) {
          lines[i] = `${lines[i]}</p>`;
        }
        ++i;
      }
    }
  }

  return {
    storyTitle,
    result: lines.join("\n"),
  };
};

module.exports = txtConverter;
