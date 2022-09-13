#!/usr/bin/env node

require('dotenv').config();

const sr = require('./service.js');

const { program } = require('commander');
const fs = require('fs');
const path = require("path");


const pjson = require('./package.json');



//For adding custom flags into the command line
{

    program.version(pjson.name + ": version-" + pjson.version);

    const outputFolder = process.env.OUTPUT_DIRECTORY;


    program
        .description("Program Custom Flags")
        .option('-H, --help')
        .option(`-I, --input <type>`, 'Input to the dist folder')
        .option(`-O, --output <type>`, 'Output to a custom folder')

    program.parse();



    const options = program.opts();

    if(options.help){
        console.log("\n--Commands--\nVersion: -V, --version\nInput: -I, --input\nOutput: -O, --output");
        console.log("\n--Help--\nDescription: The program is used to display the content of a .txt file into that of an .html");
        console.log("Output: Typing 'my-ssg --output(or)-O <directory_name> in the command line will generate a new directory where the HTML5 files will be added to")
        console.log("Input: By typing 'my-ssg --input(or)-I file.txt' the program will generate a valid HTML5 file\n")
    }
    if(options.input){

        sr.createFolder(outputFolder);

        let stats = fs.statSync(program.opts().input);

        //Determines whether the value that was given is a directory or a file
        if(stats.isDirectory()){
            let directoryName = program.opts().input;

            //read the directory, and go through  each individual file name using forEach
            fs.readdir(directoryName, (err, files) => {
                files.forEach(file => {
                    let filename = directoryName + "/" + file;
                    sr.textConverter(filename);
                });
            });

        } else if (stats.isFile()){
            let filename = program.opts().input;
            sr.textConverter(filename);
        }

    }
    if(options.output){    



        //Prevents the user from creating a directory that currently exists within the program
        //Resets the value of the directory to 'dist'
        if(fs.existsSync(options.output)){
            console.log("The name given already exists as a directory or file");
            console.log("Set directory to default: 'dist'");
            sr.replaceDirectory("dist");
            return;
        }

        sr.replaceDirectory(options.output);

        sr.createFolder(options.output);

    }
}





