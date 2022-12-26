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
