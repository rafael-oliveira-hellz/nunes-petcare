const bodyAddCustomerJsonSchema = {
    type: "object",
    required: ["name"],
    properties: {
        name: { type: "string" },
    },
};
const headersJsonSchema = {
    type: "object",
    properties: {
        authorization: { type: "string" },
    },
    required: ["authorization"],
};
const addCustomerResponse = {
    type: "object",
    properties: {
        _id: { type: "string", maxLength: 24, minLength: 24 },
        name: { type: "string" },
        active: { type: "boolean" },
        createdById: { type: "string" },
        userId: { type: "string" },
        createdAt: { type: "string" },
    },
};
export const addCustomerPostSchema = {
    schema: {
        body: bodyAddCustomerJsonSchema,
        response: { 200: addCustomerResponse },
        headers: headersJsonSchema,
    },
};

const queryStringJsonLoadCustomerSchema = {
    type: "object",
    properties: {
        _id: { type: "string", maxLength: 24, minLength: 24 },
    },
    required: ["_id"],
};
const loadCustomerResponse = {
    type: "object",
    properties: {
        _id: { type: "string", maxLength: 24, minLength: 24 },
        name: { type: "string" },
        active: { type: "boolean" },
        createdById: { type: "string" },
        userId: { type: "string" },
        createdAt: { type: "string" },
    },
};
export const loadCustomerGetSchema = {
    schema: {
        headers: headersJsonSchema,
        querystring: queryStringJsonLoadCustomerSchema,
        response: {
            200: loadCustomerResponse,
        },
    },
};
const deleteCustomerResponse = { type: "boolean" };
const queryStringJsonDeleteCustomerSchema = {
    type: "object",
    properties: {
        _id: { type: "string", maxLength: 24, minLength: 24 },
    },
    required: ["_id"],
};
export const deleteCustomerSchema = {
    schema: {
        headers: headersJsonSchema,
        querystring: queryStringJsonDeleteCustomerSchema,
        response: {
            200: deleteCustomerResponse,
        },
    },
};
const queryStringJsonUpdateCustomerSchema = {
    type: "object",
    properties: {
        _id: { type: "string", maxLength: 24, minLength: 24 },
    },
    required: ["_id"],
};
const updateCustomerResponse = {
    type: "object",
    properties: {
        _id: { type: "string", maxLength: 24, minLength: 24 },
        name: { type: "string" },
        createdById: { type: "string" },
        userId: { type: "string" },
    },
};
const updateCustomerBody = {
    type: "object",
    properties: {
        name: { type: "string" },
    },
};
export const updateCustomerSchema = {
    schema: {
        headers: headersJsonSchema,
        querystring: queryStringJsonUpdateCustomerSchema,
        body: updateCustomerBody,
        response: {
            200: updateCustomerResponse,
        },
    },
};
const queryStringJsonLoadCustomerByPageSchema = {
    type: "object",
    properties: {
        page: { type: "integer", minimum: 1 },
        sortBy: { type: "string" },
        typeSort: { type: "string" },
    },
    required: ["page"],
};
const loadCustomerByPageResponse = {
    type: "object",
    properties: {
        clients: {
            type: "array",
            maxItems: 10,
            items: {
                type: "object",
                properties: {
                    _id: { type: "string", maxLength: 24, minLength: 24 },
                    name: { type: "string" },
                    active: { type: "boolean" },
                    createdById: { type: "string" },
                    userId: { type: "string" },
                    createdAt: { type: "string" },
                },
            },
        },
        total: { type: "integer" },
    },
};
export const loadCustomerByPageGetSchema = {
    schema: {
        headers: headersJsonSchema,
        querystring: queryStringJsonLoadCustomerByPageSchema,
        response: {
            200: loadCustomerByPageResponse,
        },
    },
};
