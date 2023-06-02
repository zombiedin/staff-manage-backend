# Node Boiler Plate

## Check List
- [/] Typescript
- [/] express
- [/] Helmet https://github.com/helmetjs/helmet
- [/] Swagger Spec
- [/] Testing using Chaijs, mocha, sinonjs
- [/] Code coverage
- [/] eslint, prettier
- [/] commit and push hooks 
- [/] sequelize database setup
- [/] dockerfile
- [/] azure pipeline
- [/] health check route
- [ ] kubernetes deployment config files
- [ ] integrate [Azure application insights](https://learn.microsoft.com/en-us/azure/azure-monitor/app/nodejs)
- [ ] logs with transaction id
- [ ] [Gitops ready for AKS](https://learn.microsoft.com/en-us/azure/azure-arc/kubernetes/tutorial-use-gitops-flux2?tabs=azure-cli)
- [ ] Return git commit id in HTTP response header

## Assign for intern
- Testing
  - what is Testing
- dockerfile
  - what is Dockerfile


# Node.js Boilerplate

This Node.js boilerplate provides a starting point for building backend applications with Express, TypeScript, and other popular tools and libraries.
## Folder Structure

node-boilerplate/
├── src/
│   ├── controllers/
│   ├── database/
│   │   ├── config/
│   │   ├── migrations/
│   │   ├── models/
│   │   └── seeders/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.ts
│   └── index.ts
├── tests/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── .env.example
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── .nvmrc
├── .prettierignore
├── .prettierrc.json
├── Dockerfile
├── azure-pipelines.yml
├── package-lock.json
├── package.json
└── tsconfig.json

## Getting Started

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file using the `.env.example` file as a reference
4. Run `npm start` to start the application

## Example URL

You can access the example route at `http://localhost:3000/example` and the health-check route at `http://localhost:3000/health`.

## Commands

- `npm start`: Start the application in development mode with hot-reloading
- `npm run build`: Build the application for production
- `npm run serve`: Start the application in production mode
- `npm run lint`: Lint the code using ESLint
- `npm run lint:fix`: Fix lint issues using ESLint
- `npm run test`: Run tests using Mocha

## Contributing

Before pushing your code or making a pull request, make sure to run `npm run lint:fix` and `npm run test` to ensure the code adheres to the project's standards and passes all tests.

## SSL Connection for Production Database

Make sure to configure your Sequelize connection settings in `src/database/config` to use SSL for connecting to the production database.

## Husky

This project uses Husky to run `lint:fix` before every commit and `npm run test` before every code-push. Make sure to set it up as per the Husky documentation.


## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js v16 or later
- npm (included with Node.js)
- Docker (optional)

## Getting Started

1. Clone this repository:
  -

2. Change to the project directory:
  -

3. Install dependencies:
  - npm install

4. Start the development server:
  - npm run dev

## Building and Running in Production

1. Build the project:
  - npm run build

2. Start the production server:
  npm start

## Running Tests

To run tests, use the following command:
`- npm test

## Using Docker (optional)

1. Build the Docker image:
  - docker build -t node-boilerplate .

2. Run the Docker container:
  - docker run -p 3000:3000 node-boilerplate

## Customizing the Boilerplate

This boilerplate includes example files for controllers, middlewares, models, routes, and services. You can use these files as templates for your own application components. Replace or update the example files as needed to fit your project requirements.

## License

[MIT](LICENSE)
