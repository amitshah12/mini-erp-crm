import swaggerJsdoc from "swagger-jsdoc";
import { schemas } from "../docs/schemas";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Mini ERP + CRM API",
            version: "1.0.0",
            description:
                "REST API documentation for the Mini ERP + CRM Backend.",
        },

        servers: [
            {
                url: "http://localhost:5000/api",
                description: "Development Server",
            },
        ],

        components: {
            schemas,

            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },

    apis: ["./src/**/*.routes.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);