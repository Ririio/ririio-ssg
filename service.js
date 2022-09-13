require('dotenv').config();
const fs = require('fs');
const path = require("path");


module.exports = {

    //Function used to convert all .txt files into a .html
    textConverter: (filename) => {
        try {

            let array = fs.readFileSync(filename).toString().split(/\r?\n/);
            // let array = fs.readFileSync(path.resolve(__dirname + "/" + filename)).toString().split("\n");
    
            if(!filename.includes(".txt"))
                throw "The file provided is not a text file";

            let result = filename.replace(".txt", ".html");  
    
            //Used to only keep the file name that is needed when the file are under a directories
            result = result.substring(result.lastIndexOf("/") + 1);

            let i = 0;
            let isValidTitle = false;
            let storyTitle;
    
            //Used to check if the 2nd and 3rd index contains a value to determine whether the first line is a title
            if(array[1].trim().length === 0 && array[2].trim().length === 0){
                storyTitle = array[0];
                array[0] = "<h1>" + array[0] + "</h1>";
                isValidTitle = true;
                i += 3;
            }
    
            //Go through a loop to look for the first portion of a sentence or a paragraph from the file
            for(i; i < array.length; ++i){
                if(array[i].trim().length !== 0){
                    array[i] = `<p>${array[i]}`;           

                    //Keep looping until the value of the array after the current one is empty
                    while(array[i].trim().length !== 0){
                        if(array[i + 1].trim().length === 0){
                            array[i] = `${array[i]}</p>`
                        }
                        ++i;
                    }
                }
            }
    
            {
    
                //Opening the file and add all of the array values line by line
                let file = fs.createWriteStream("./" + process.env.OUTPUT_DIRECTORY + "/" + result);
    
                file.write(`<!doctype html>\n<html lang="en">\n\n<head>\n\t<meta charset="utf-8">\n\t<title>${isValidTitle ? storyTitle : "FileName"}</title>\n\t<meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body>\n\n`)  
                file.on('error', function(err) { /* error handling */ });
                array.forEach(function(v) { file.write(Array.from(array).join('\n') + '\n'); });
                file.write("</body>\n</html>");
                file.end();
    
            }
    
    
        } catch (err) {
            console.error(err);
        }
    },
    createFolder: (outputFolder) => {

        //Check if the folder given exists before creating a new one
        try {
            if (!fs.existsSync(outputFolder))
                fs.mkdirSync(outputFolder);
            else{
                //Forcefully deletes the original folder and its content before creating a new one
                fs.rmSync(outputFolder, { recursive: true, force: true });
                fs.mkdirSync(outputFolder);
            }
            } catch (err) {
            console.error(err);
        }
    },
    replaceDirectory: (str) => {

        fs.readFile('./.env', 'utf-8', (err, contents) => {
            if (err) {
                console.log(err);
                return;
            }

            //replace the value of the "OUTPUT_DIRECTORY to whatever the user wants"
            let result = contents.replace(process.env.OUTPUT_DIRECTORY, str);

            fs.writeFile('./.env', result, 'utf8', function (err) {
                if (err) return console.log(err);
             });

        });
    }
}



