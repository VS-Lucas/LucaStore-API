# LucaStore API

## Description

This is an API project built with [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/). The API manages users, products, catalogs, shopping carts, and orders.

## Installation

### Prerequisites

Before you begin, you need to have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/installation) installed. If you don't have Node.js and pnpm installed, follow the instructions below to install them:

1. Install Node.js:

    [Download and install Node.js](https://nodejs.org/) from the official website.

2. Install pnpm:

    [pnpm installation instructions](https://pnpm.io/installation)

### Cloning the Repository

1. Clone the repository:

    ```bash
    git clone https://github.com/VS-Lucas/LucaStore-API.git
    cd lucastore-api
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

## Populating the Database

1. To reset the database and populate it with seed data, run:

    ```bash
    npx prisma migrate reset
    ```

## Running the Project

To run the project, you can use the following command in the terminal, while in the project's root directory:

```bash
pnpm run start
```

**Hint:**
To speed up the development process (20 times faster), you can use the SWC builder by passing the `-b swc` flag to the start script, as follows:

```bash
npm run start -- -b swc
```

To watch for changes in your files, you can run the following command to start the application:

```bash
pnpm run start:dev
```

## Contribution

If you wish to contribute to this project, please open a Pull Request or an Issue.

## Contact

For questions and suggestions, please contact us via email: lvs3@cin.ufpe.br
