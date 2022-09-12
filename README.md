# About The Project #

The project allows for the converstion of .txt files to a formatted HTML5

### Built With ###

* [Express](https://expressjs.com/)
* [Commander](https://www.npmjs.com/package/commander)
* [Dotenv](https://www.npmjs.com/package/dotenv)


## Getting Started ##

### Installation ###

1. Change the current directory to "release 0.1"
2. Type "npm install" in the command line to download all necessary libraries
3. Type "npm link" to allow for "my-ssg" to function

The program should now allow you to use all commands without any problems

### Commands ###

Write "my-ssg" before using any commands or it will not work

**Input** (--input, -I)
<br />
    &nbsp;&nbsp;This command will allow the user to be able to convert a .txt file to that of an HTML5.
<br />
    **Command Structure**: "my-ssg --input [fileName/directoryName]"
<br />
<br />
**Output** (--output, -O)
<br />
    &nbsp;&nbsp;This command will allow the user to change to create their own default folder for all the HTML5 that they convert.
<br />
    **Command Structure**: my-ssg --output [directoryName] | my-ssg --output [directoryName] --input [filename]
<br />
<br />
**Help** (--help, -H)
<br />
    &nbsp;&nbsp;This command will display the description of the program and all its available command and their respective descriptions
<br />
    **Command Structure**: "my-ssg --help"
<br />
<br />
**Version** (--version, -V)
<br />
    &nbsp;&nbsp;This command displays the current version of the program
<br />
    **Command Structure**: "my-ssg --version"
<br />


## Roadmap ## 

- [x] Add Input Command
- [x] Add Output Command
- [ ] Add Stylize Command
- [ ] Allow for multi-level directory conversion
- [ ] Generate an index.js which contains all links to the HTML files within a directory
- [ ] Stylized each Generated HTML page

<br />


## Contact ## 
***
Contributor(s): **Mario Leonardo - mrleonardo@myseneca.ca**
