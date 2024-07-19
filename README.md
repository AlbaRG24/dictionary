# Idioms Dictionary

This is a web application built with Next.js, React Query, and NextAuth. The application allows users to search for idioms, view an A-Z list of idioms, and contribute new idioms.

## Features

- Search for idioms.
- View an A-Z list of idioms.
- Contribute new idioms (authenticated users only).

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation.
- [Json-server](https://github.com/typicode/json-server) - Mock REST API.
- [React Query](https://react-query.tanstack.com/) - Data fetching and state management.
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js applications.
- [Ant Design](https://ant.design/) - UI components and design system.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (version 14 or later)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install/)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/AlbaRG24/dictionary.git
    cd dictionary
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

### Running the Development Server

1. **Start the development server:**

    ```bash
    npm run dev
    ```

2. **Open your browser and navigate to:**

    ```
    http://localhost:3000
    ```
3. **Start the JSON server:**

    ```
    npx json-server entries-db.json --port 4000
    ```

4. **The mock API will be available at:**

   ```
   http://localhost:4000/idioms
   ```
