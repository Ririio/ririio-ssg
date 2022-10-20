#!/usr/bin/env node

require("dotenv").config();
const { program } = require("commander");
const fs = require("fs");
const sr = require("./service");
const pjson = require("./package.json");
const { textConverter } = require("./src/text-converter");

// For adding custom flags into the command line

program.version(`${pjson.name}: version-${pjson.version}`);

const outputFolder = process.env.OUTPUT_DIRECTORY;

program
  .description("Program Custom Flags")
  .option("-H, --help")
  .option(`-I, --input <type>`, "Input to the dist folder")
  .option(
    `-C, --config <type>`,
    "Output to the folder specified in config file"
  )
  .option(`-O, --output <type>`, "Output to a custom folder")
  .option(
    `-L, --lang <type>`,
    "Changes generated lang attributes on the html root"
  );

program.parse();

const options = program.opts();

if (options.help) {
  console.log(
    "\n--Commands--\nVersion: -V, --version\nInput: -I, --input\nOutput: -O, --output"
  );
  console.log(
    "\n--Help--\nDescription: The program is used to display the content of a .txt file into that of an .html"
  );
  console.log(
    "Output: Typing 'my-ssg --output(or)-O <directory_name> in the command line will generate a new directory where the HTML5 files will be added to"
  );
  console.log(
    "Input: By typing 'my-ssg --input(or)-I file.txt' the program will generate a valid HTML5 file\n"
  );
  console.log(
    "Config: By typing 'my-ssg --config(or)-C file.json' the program will generate a valid HTML5 file based on configuration specified\n"
  );
  console.log(
    "Lang: By typing 'my-ssg --lang(or)-L <language> the program will add a 'lang' attribute on the root html"
  );
}
try {
  if (options.input) {
    fs.rmSync(outputFolder, { recursive: true, force: true });
    sr.createFolder(outputFolder);

    const stats = fs.statSync(program.opts().input);

    // Determines whether the value that was given is a directory or a file
    if (stats.isDirectory()) {
      const directoryName = program.opts().input;

      // read the directory, and go through  each individual file name using forEach
      fs.readdir(directoryName, (err, files) => {
        let navLinks;

        files.forEach((file) => {
          const outputFileName = file
            .substring(file.lastIndexOf("/") + 1)
            .replace(/\.(txt|md)$/, ".html");

          if (navLinks) navLinks += outputFileName + ",";
          else navLinks = outputFileName + ",";

          sr.createIndexFile(outputFolder, navLinks);
        });

        files.forEach((file) => {
          const filename = `${directoryName}/${file}`;

          textConverter(filename, navLinks);
        });
      });
    } else if (stats.isFile()) {
      const filename = program.opts().input;
      textConverter(filename);
    }
  }
  if (options.output) {
    // Prevents the user from creating a directory that currently exists within the program
    // Resets the value of the directory to 'dist'
    if (fs.existsSync(options.output)) {
      console.log(
        "The name given already exists as a directory or file",
        "\nSet directory to default: 'dist'"
      );
      sr.replaceDirectory("dist");
    } else sr.replaceDirectory(options.output);
  }
  if (options.lang) {
    sr.changeLanguage(options.lang);
  }
  if (options.config) {
    const lines = fs.readFileSync(options.config, "utf8");
    const parsedObj = JSON.parse(lines);

    if (parsedObj.lang) {
      sr.changeLanguage(parsedObj.lang);
    }

    if (parsedObj.output) {
      if (fs.existsSync(parsedObj.output)) {
        console.log("The name given already exists as a directory or file");
        console.log("Set directory to default: 'dist'");
        sr.replaceDirectory("dist");
      }
      sr.replaceDirectory(parsedObj.output);
      fs.rmSync(outputFolder, { recursive: true, force: true });
      sr.createFolder(outputFolder);
    }

    if (!parsedObj.output) {
      fs.rmSync(outputFolder, { recursive: true, force: true });
      sr.createFolder(outputFolder);
    }

    const stats = fs.statSync(parsedObj.input);

    // Determines whether the value that was given is a directory or a file
    if (stats.isDirectory()) {
      const directoryName = parsedObj.input;

      // read the directory, and go through  each individual file name using forEach
      fs.readdir(directoryName, (err, files) => {
        files.forEach((file) => {
          const filename = `${directoryName}/${file}`;
          textConverter(filename);
        });
      });
    } else if (stats.isFile()) {
      const filename = parsedObj.input;
      textConverter(filename);
    }
  }
} catch (err) {
  console.error(err.message);
}
