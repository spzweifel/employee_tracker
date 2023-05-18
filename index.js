const inquirer = require('inquirer');

const questions = () => { 
    return inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'What is your project title?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please, describe your project.',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'How is this installed?',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'How is your application used?',
    },
    {
        type: 'input',
        name: 'guidelines',
        message: 'What are the contribution guidelines?',
    },
    {
        type: 'input',
        name: 'instructions',
        message: 'Please, enter the test instructions.',
    },
    {// prompt for the license
        type: 'list',
        name: 'license',
        message: 'What license are you using?',
        choices: ["mit", "apache", "gpl", "none" ]
    } 
])
.then((answers) => {
    console.log(answers) 
}) 
}
questions()