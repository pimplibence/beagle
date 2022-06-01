const cwd = process.cwd();

module.exports = (plop) => ({
    description: 'Generate an application',
    prompts: [
        {
            type: 'input',
            name: 'name'
        }
    ],
    actions: [
        {
            type: 'add',
            path: `${cwd}/{{name}}/src/index.ts`,
            templateFile: './templates/application/src/index.ts.hbs',
        },
        {
            type: 'add',
            path: `${cwd}/{{name}}/src/applications/base-application.ts`,
            templateFile: './templates/application/src/applications/base-application.ts.hbs',
        },
        {
            type: 'add',
            path: `${cwd}/{{name}}/tsconfig.json`,
            templateFile: './templates/application/tsconfig.json.hbs',
        },
        {
            type: 'add',
            path: `${cwd}/{{name}}/package.json`,
            templateFile: './templates/application/package.json.hbs',
        },
        {
            type: 'add',
            path: `${cwd}/{{name}}/.gitignore`,
            templateFile: './templates/application/.gitignore.hbs',
        },
        {
            type: 'add',
            path: `${cwd}/{{name}}/env.yml`,
            templateFile: './templates/application/env.yml.hbs',
        }
    ]
});
