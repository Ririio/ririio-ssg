const fs = require('fs')
const txtConverter = require('./txtConverter')
const { mdConverter } = require('./mdConverted')

module.exports = {
  style: `
    <style>
    body {
      display: flex;
      -moz-user-select: -moz-none;
      -khtml-user-select: none;
      -webkit-user-select: none;

      -ms-user-select: none;
      user-select: none;
    }

    .text {
      margin-left: 170px;
    }

    .sidenav {
      height: 100%; /* Full-height: remove this if you want "auto" height */
      width: 160px; /* Set the width of the sidebar */
      position: fixed; /* Fixed Sidebar (stay in place on scroll) */
      z-index: 1; /* Stay on top */
      top: 0; /* Stay at the top */
      left: 0;
      background-color: #111; /* Black */
      overflow-x: hidden; /* Disable horizontal scroll */
      padding-top: 20px;
    }

    .categoryTitle {
      font-size: 30px;
      color: #818181;
      margin-left: 10px;
      margin-top: 5px;


    }

    .categoryTitle:hover {
      cursor: pointer;
    }

    .categoryTitle a {
      text-decoration: none;
      color: #818181;
    }

    /* The navigation menu links */
    .sidenav ul > a {
      text-decoration: none;
      font-size: 15px;
      color: #818181;
      display: block;
    }

    .sidenav ul {
      margin-top: -20px;
    }

    /* When you mouse over the navigation links, change their color */
    .sidenav a:hover {
      color: #f1f1f1;
    }


    .main {
      margin-left: 160px; /* Same as the width of the sidebar */
      padding: 0px 10px;
    }


    </style>
  `,
  script: `
    <script>
    function hideButton(name) {
      var x = document.getElementById(name);
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }
    </script>
  `,
  textConverter: (inputFilepath, navLinks) => {
    let result
    let storyTitle
    let linksArr

    if (navLinks) {
      linksArr = navLinks.split(',')
    }

    if (inputFilepath.endsWith('.txt')) {
      ;({ result, storyTitle } = txtConverter(inputFilepath))
    } else if (inputFilepath.endsWith('.md')) {
      ;({ result, storyTitle } = mdConverter(inputFilepath))
    } else {
      throw new Error('The file provided is not a txt or md file')
    }

    // Used to only keep the file name that is needed when the file are under a directories
    const outputFileName = module.exports.convertExtension(inputFilepath)

    // Opening the file and add all of the array values line by line
    const file = fs.createWriteStream(
      `./${process.env.OUTPUT_DIRECTORY}/${outputFileName}`
    )

    file.write(
      `<!doctype html>\n<html lang="${
        process.env.HTML_LANGUAGE
      }">\n\n<head>\n\t<meta charset="utf-8">\n\t${
        navLinks ? module.exports.style : ''
      }
      <title>${
        storyTitle || 'FileName'
      }</title>\n\t<meta name="viewport" content="width=device-width, initial-scale=1">\n
      
      ${module.exports.script}



      </head>\n<body>\n\n
      ${
        navLinks ? module.exports.createNavBarDiv(linksArr, file) : ''
      }<div class="text">
      ${result}</div>\n</body>\n</html>
      `
    )

    file.end()
  },
  createIndexFile: (outputFolder, fileLinks) => {
    const file = fs.createWriteStream(`./${outputFolder}/index.html`)
    const linksArr = fileLinks.split(',')

    file.write(
      `<!doctype html>\n
      <html lang="${process.env.HTML_LANGUAGE}">
      \n\n
      <head>\n\t<meta charset="utf-8">\n\t
        \n\t<meta name="viewport" content="width=device-width, initial-scale=1">\n

      <style>
        body {
          background-color: #a5a2a2;
        }

        .container {
          display: grid;
          justify-content: center;
        }

        .card {
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          transition: 0.3s;
          display: flex;
          padding: 2px 16px;
          text-decoration: none;
          color: black;
          background: #e6e6e6;
          margin-top: 20px;
        }

        .card:hover {
          box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
        }
      </style>

      </head>\n

      <body>
        <div class="container">
          ${module.exports.createCard(linksArr)}
        </div>
      </body>
      `
    )
    file.end()
  },
  createNavBarDiv: (arr) => {
    // Added a parameter for the hiddenButton for when I want to add a new category for the sidebar
    let str = `<div class="sidenav">
    <nav><p class="categoryTitle"><a href="index.html">Home</a></p></nav>
    <nav><p class="categoryTitle" onclick="hideButton('indexList')">Stories</p><ul id="indexList">`

    arr.forEach((link) => {
      const name = link.substring(0, link.lastIndexOf('.'))
      if (link) {
        str += `<a href="${link}"> ${name} </a><hr />`
      }
    })
    str += '</ul></nav></div>'
    return str
  },
  createCard: (arr) => {
    let str = ''

    arr.forEach((link) => {
      const name = link.substring(0, link.lastIndexOf('.'))
      if (link) {
        str += `<a class='card' href="${link}"> <h1><b>${name}</b></h1> </a><hr />`
      }
    })
    return str
  },
  convertExtension: (str) => {
    const outputFileName = str
      .substring(str.lastIndexOf('/') + 1)
      .replace(/\.(txt|md)$/, '.html')
    return outputFileName
  },
  // Lab 3: Created a function to prevent repetition when changing key-pair values
  readFileEnv: (key, msg, str) => {
    let result = fs.readFileSync('./.env', { encoding: 'utf8', flag: 'r' })

    if (key === 'HTML_LANGUAGE') {
      result = result.replace(process.env.HTML_LANGUAGE, str)
    } else if (key === 'OUTPUT_DIRECTORY') {
      result = result.replace(process.env.OUTPUT_DIRECTORY, str)
    }
    fs.writeFileSync('./.env', result)

    console.log(`${msg} ${str}`)
  },
}
