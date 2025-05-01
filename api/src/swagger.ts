import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PO Arrombado API',
      version: '1.0.0',
    },
  },
  apis: ['./src/messageDocs.ts'],
}

const swaggerSpec = swaggerJsdoc(options)
export default swaggerSpec
