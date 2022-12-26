module.exports = function (plop) {
    plop.setGenerator("entities", {
        description: "Generate entities",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "What is the name of the entity?",
            },
        ],
        actions: [...entitiesActions],
    });

    plop.setGenerator("repositories", {
        description: "Generate repositories",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "What is the name of the repository?",
            },
        ],
        actions: [...reposittoriesActions],
    });

    plop.setGenerator("test", {
        description: "Generate a new test",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "What is the name of the file?",
            },
            {
                type: "input",
                name: "entity",
                message: "What is the name of the entity?",
            },
            {
                type: "input",
                name: "layer",
                message: "What is the name of the layer?",
            },
        ],
        actions: [
            {
                type: "add",
                path: "../src/slices/{{camelCase entity}}/{{camelCase name}}/{{pascalCase name}}.spec.ts",
                templateFile: "./templates/test.spec.ts.hbs",
            },
        ],
    });
};

const entitiesActions = [
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/entities/{{pascalCase name}}Entity.ts",
        templateFile: "./templates/entities/DomainEntity.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/entities/{{pascalCase name}}Entity.spec.ts",
        templateFile: "./templates/entities/DomainEntity.spec.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/entities/index.ts",
        templateFile: "./templates/entities/index.ts.hbs",
    },
];

const reposittoriesActions = [
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/repositories/contracts/add{{pascalCase name}}Repository.ts",
        templateFile: "./templates/repositories/contracts/addDomainRepository.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/repositories/contracts/index.ts",
        templateFile: "./templates/repositories/contracts/index.ts.hbs",
    },
];
