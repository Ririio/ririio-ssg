# About The Project

The project allows for the conversion of .txt and .md files to a formatted HTML5

## Getting Started

1. Open the consolde and install the package by typing `npm install ririio-ssg`
2. Create a connection between the package and your current project folder by typing `npm link ririio-ssg`
3. Create a file on your main directory called `.env`, this is used to store value of your output folder and current language
4. Inside `.env` paste this line of code `OUTPUT_DIRECTORY="dist"` followed by `HTML_LANGUAGE="en-CA"` on the line beneath

### Commands
| Command Name  | Command Line | Description | Command Structure | 
|---|---|---|---|
| **Input** | (--input, -I) | This command will allow the user to be able to convert a .txt or .md file to that of an HTML5. | my-ssg --input [fileName/directoryName] |
| Config | (--config, -C) | This command will allow the user to be able to pass a .json file with supported configuration keys such as input, output, and lang. The command will then be able to convert .txt or .md files specified in the input property to that of an HTML5. The output directory by default is dist, but if output key is defined in config file, the command will replace the default directory with the value of output key | my-ssg --config [fileName] |
| Output | (--output, -O) | This command will allow the user to change to create their own default folder for all the HTML5 that they convert | my-ssg --output [directoryName] | my-ssg --output [directoryName] --input [filename] |
| Help | (--help, -H) | This command will display the description of the program and all its available command and their respective descriptions | my-ssg --help
| Version | (--version, -V) | This command displays the current version of the program | my-ssg --version |

## Roadmap

- [x] Add Input Command
- [x] Add Output Command
- [ ] Add Stylize Command
- [ ] Allow for multi-level directory conversion
- [ ] Generate an index.js which contains all links to the HTML files within a directory
- [ ] Stylized each Generated HTML page
- [x] Add Language Command

<br />

## Contact

---

Contributor(s): **Mario Leonardo - mrleonardo@myseneca.ca**
