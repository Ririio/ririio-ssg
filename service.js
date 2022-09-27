require("dotenv").config();
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
    fs.readFile("./.env", "utf-8", (err, contents) => {
      if (err) {
        console.log(err);
        return;
      }
      // replace the value of the "OUTPUT_DIRECTORY to whatever the user wants"
      const result = contents.replace(process.env.OUTPUT_DIRECTORY, str);

      fs.writeFile("./.env", result, "utf8", () => {
        console.log(`Renamed "dist" to "${str}"`);
      });
    });
  },
};
