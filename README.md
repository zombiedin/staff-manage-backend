# My Backend Project

## Description

This project is a backend application built using Node.js and Express.js. It provides a RESTful API for managing projects staffs users and performing various operations. The project utilizes PostgreSQL as the database and ADFS for authentication.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)
- [Contact Information](#contact-information)

## Installation

1. Clone the repository: `git clone https://github.com/zombiedin/staff-manage-backend.git` or <…azure devops link...>
2. Install dependencies: `npm install`
3. Set up the environment variables:
   - Copy the `.env.example` file to `.env` and update the values with your configuration.
4. Run the project: `npm run dev`

## Usage

1. Make sure the backend server is running.
2. Use a tool like Postman to interact with the API endpoints.
3. Refer to the [API Documentation](https://www.google.com/) for detailed instructions and examples. (not ready)

## Configuration

The following environment variables need to be configured in the `.env` file:

- `DATABASE_URL`: for database url to connect
- `HRD_URL_GETALL`: url of HR datacenter API (get_all)
- `HRD_URL_CHANGE`: url of HR datacenter API (data_change)
- `HRD_XAPI`: header for HRD API authenication
- `HRD_API`: header for HRD API authenication
- `CU_TOKEN`: token for clickup API authorization

## API Documentation

The API exposes the following endpoints: ( `[x]` = ready to use )

- data integration API ( get data from external ):
  - `[ ] GET /api/cu/retrieve`: Get all projects from ClickUp and update the database.
  - `[ ] POST /api/dc/getall`: Get all staff details from HR datacenter.
  - `[ ] GET /api/dc/datachange`: Get all changes that happen on HR datacenter.
- data access API ( get data from our database ):
  - `[ ] GET /api/project`: Get all projects within their team ( in body { } )

[not yet started] For detailed documentation and examples of API requests and responses, please refer to [API.md](https://www.google.com/).

## Deployment

To deploy the project to a production environment, follow these steps:

1. still working on...

## Contributing

Contributions are welcome! If you find any issues or have suggestions, please open an issue or submit a pull request. When contributing, please follow the existing coding style.

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [ClickUp](https://clickup.com/api/)

## Contact Information

For any questions or inquiries, feel free to contact me at
zombiedinst@gmail.com or taechatw@betagro.com
