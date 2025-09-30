
# Two-Step Verify App

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

App stack:

- React
- TypeScript
- Redux / RTK Query
- Vite
- GraphQl via msw mocks
- Ant Design

---

This document will provide you with an overview of the app and guide you through the process of setting it up and starting it.

**About the App**
This app is an interface for the two-step authentication. It provides users to login thru email + password and verify via code sended on their email.

# Getting Started

To start using the app, follow the steps below:

1.  **Add the Node env to the .env file:**
    Open the `.env` file in the root of the project and add env variable to set the development environment. At this time vite config provides only development configuration.

```cpp
NODE_ENV = 'development'
```

## Installation

To install the app and its dependencies, follow the steps below:

1.  **Clone the repository:**
    Start by cloning the repository to your local machine using the following command:
    ```cpp
    git clone https://github.com/helga-umrikh/Two-Step-Verify-App
    ```
2.  **Navigate to the project directory:**
    Once the repository is cloned, navigate to the project directory using the following command:
    ```cpp
    cd
    ```
3.  **Install dependencies:**
    Before running the app install the package manager npm to install all the dependencies.
    ```cpp
    npm install
    ```

## Starting the App

To start the app, run the following command:

```cpp
npm run dev
```

This will start the development server and open the app on the 3000 port in your default web browser. You should now be able to navigate to the main page.
