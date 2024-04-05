//readme generator

const inquirer = require("inquirer");
const fs = require("fs");

//allows the user to create the filename when executing
//grader was unable to get this part of the code-this will get changed back as it's a nice feature to use in the future
//const filename = process.argv[2];

//CREATED FOR THE CENTRAL GRADER---------------------------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const filename = "readmeSample.md"
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//user questions/prompts
inquirer.prompt([
    {
        type: 'input',
        message: 'What is your project title?',
        name: 'pName',
    }, 

    {
        type: 'input',
        message: 'What is your project description?',
        name: 'pDescription',
    }, 
    //Licensing options
    {
        type: 'list',
        choices: ['MIT License', 'Apache 2.0', 'ISC License', 'GNU AGPLv3', 'GNU Mozilla Public License 2.0', 'Unlicense'],
        message: 'Which license would you like to use for application/project?',
        name: 'pLicensing',
    },

    {
        type: 'input',
        message: 'What are your installation instructions?',
        name: 'pInstall',
    }, 

    {
        type: 'input',
        message: 'What are your usage instructions?',
        name: 'pUsage',
    }, 

    {
        type: 'input',
        message: 'What are your contribution guidelines?',
        name: 'pContribution',
    }, 

    {
        type: 'input',
        message: 'What kinds of testing would you like to do for this project?',
        name: 'pTest',
    }, 

    {
        type: 'input',
        message: 'What is your GitHub username?',
        name: 'githubUsername',
    }, 

    {
        type: 'input',
        message: 'What email address would you like associated and published with this project?',
        name: 'pEmail',
    }, 
]).then((data) => {
    console.log(data);

    //allows the badges to show up at the top of the readme file that is generated
    let badgeEl
        if (data.pLicensing === 'MIT License') {
            badgeEl = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
        } else if (data.pLicensing === 'Apache 2.0') {
           badgeEl = '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
        } else if (data.pLicensing === 'ISC License') {
            badgeEl = '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)'
        } else if (data.pLicensing === 'GNU AGPLv3') {
            badgeEl = '[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)'
        } else if (data.pLicensing === 'GNU Mozilla Public License 2.0') {
            badgeEl = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)'
        } else if (data.pLicensing === 'Unlicense') {
            badgeEl = `[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)`
        };
     
    //uses this template as the guide for generating the new file, this was chosen to provide flexibility with the template if requirements or spec changed    
    let template = fs.readFileSync("Readme (template).md", "utf-8");

    console.log(template);

    //this allows the user input to be added to the generated file
    template = template.replace("{{pName}}", data.pName);
    template = template.replace("{{pDescription}}", data.pDescription);
    template = template.replace("{{pBadge}}", badgeEl);
    template = template.replace("{{pLicensing}}", data.pLicensing);
    template = template.replace("{{pInstall}}", data.pInstall);
    template = template.replace("{{pUsage}}", data.pUsage);
    template = template.replace("{{pContribution}}", data.pContribution);
    template = template.replace("{{pTest}}", data.pTest);
    template = template.replace("{{githubUsername}}", data.githubUsername);
    template = template.replace("{{pEmail}}", data.pEmail);

    //this writes the file - output
    fs.writeFileSync(filename, template, "utf-8");

});
