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

    plop.setGenerator("useCases", {
        description: "Generate useCases",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "What is the name of the useCase?",
            },
        ],
        actions: [...useCasesActions],
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
        path: "../src/slices/{{camelCase name}}/repositories/contracts/Add{{pascalCase name}}Repository.ts",
        templateFile: "./templates/repositories/contracts/AddDomainRepository.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/repositories/contracts/Load{{pascalCase name}}Repository.ts",
        templateFile: "./templates/repositories/contracts/LoadDomainRepository.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/repositories/contracts/Load{{pascalCase name}}ByPageRepository.ts",
        templateFile:
            "./templates/repositories/contracts/LoadDomainByPageRepository.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/repositories/contracts/Delete{{pascalCase name}}Repository.ts",
        templateFile: "./templates/repositories/contracts/DeleteDomainRepository.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/repositories/contracts/Update{{pascalCase name}}Repository.ts",
        templateFile: "./templates/repositories/contracts/UpdateDomainRepository.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/repositories/contracts/index.ts",
        templateFile: "./templates/repositories/contracts/index.ts.hbs",
    },

    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/repositories/index.ts",
        templateFile: "./templates/repositories/index.ts.hbs",
    },
];

const useCasesActions = [
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/useCases/add{{pascalCase name}}/Add{{pascalCase name}}UseCase.ts",
        templateFile: "./templates/useCases/addDomain/AddDomainUseCase.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/useCases/add{{pascalCase name}}/Add{{pascalCase name}}UseCase.spec.ts",
        templateFile: "./templates/useCases/addDomain/AddDomainUseCase.spec.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/useCases/add{{pascalCase name}}/index.ts",
        templateFile: "./templates/useCases/addDomain/index.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/useCases/load{{pascalCase name}}/Load{{pascalCase name}}UseCase.ts",
        templateFile: "./templates/useCases/loadDomain/LoadDomainUseCase.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/useCases/load{{pascalCase name}}/Load{{pascalCase name}}UseCase.spec.ts",
        templateFile: "./templates/useCases/loadDomain/LoadDomainUseCase.spec.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/useCases/load{{pascalCase name}}/index.ts",
        templateFile: "./templates/useCases/loadDomain/index.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/useCases/load{{pascalCase name}}ByPage/Load{{pascalCase name}}ByPageUseCase.ts",
        templateFile:
            "./templates/useCases/loadDomainByPage/LoadDomainByPageUseCase.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/useCases/load{{pascalCase name}}ByPage/Load{{pascalCase name}}ByPageUseCase.spec.ts",
        templateFile:
            "./templates/useCases/loadDomainByPage/LoadDomainByPageUseCase.spec.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/useCases/load{{pascalCase name}}ByPage/index.ts",
        templateFile: "./templates/useCases/loadDomainByPage/index.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/useCases/delete{{pascalCase name}}/Delete{{pascalCase name}}UseCase.ts",
        templateFile: "./templates/useCases/deleteDomain/DeleteDomainUseCase.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/useCases/delete{{pascalCase name}}/Delete{{pascalCase name}}UseCase.spec.ts",
        templateFile: "./templates/useCases/deleteDomain/DeleteDomainUseCase.spec.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/useCases/delete{{pascalCase name}}/index.ts",
        templateFile: "./templates/useCases/deleteDomain/index.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/useCases/index.ts",
        templateFile: "./templates/useCases/index.ts.hbs",
    },
];
