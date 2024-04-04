//readme generator

    // Here are the short instructions for using your README generator:

    // 1. Locate index.js File: Find the index.js file should be this file.

    // 2. Open Integrated Terminal: Right-click on the index.js file and choose the option to open it in an integrated terminal. This action should open a terminal window within your code editor.

    // 3. Run Generator: In the terminal, type the following command:

            // node index.js NewReadMe.md

    // 4. Then press Enter. 

    // 5. Answer Prompts: Follow the prompts and answer the questions presented in the terminal. Provide the necessary information and make selections as required.

    // 6. Generate README: After providing all the information, the generator will process your inputs and create a README file with the specified name (e.g., NewReadMe.md) in the same directory where the index.js file is located.

    // 7. Review and Edit: Once the README file is generated, review it to ensure all the information is accurate and well-organized. Make any necessary edits or additions.

    // 9. Save Changes: Save the README file and any changes you've made.

    // Tada! That's it! You've successfully used the README generator to create a README file for your project.


const inquirer = require("inquirer");
const fs = require("fs");

//allows the user to create the filename when executing
const filename = process.argv[2];

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
