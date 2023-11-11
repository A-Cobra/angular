# Grocery Store (DEPRECATED)

Project that includes the testing of an authentication and interaction with an API App

The Angular Github Profile Fetcher
project is a simple yet effective application that allows users to fetch data and search for GitHub users. The application provides basic information about the user, including their name, avatar, repositories, and followers.

## Important Information

I regretfully cannot share the credentials to the application due to nondisclosure agreements with `Applaudo`.

As of the current date (2023/11/10), the API supports login functionality. However, I must inform you that certain features, such as adding items to the cart or retrieving items from it, are currently restricted and not accessible.

## Key Features

1. **REST API integration**: The use of a renowned and well-built API like GitHub's ensures the availability of comprehensive and reliable user data. The GitHub API offers a rich set of endpoints and features, enabling the application to access a wide range of user information, repositories, and other relevant data points.

2. **Styling**: The styling of the project has been meticulously designed to closely resemble GitHub's user interface. The goal was to create a visual experience that aligns as much as possible with GitHub's aesthetics. By adopting a minimalist approach, the project prioritizes simplicity and readability, ensuring that users can easily navigate and interact with the application.

3. **Error handling**: The project also incorporates error handling to gracefully handle scenarios where the API request fails, encounters an error, or returns empty arrays. By implementing appropriate error handling mechanisms, the application ensures a smooth user experience and provides informative feedback in case of any issues during data retrieval.

## Screenshots

Search

<img src="./src/assets/images/screenshots/search.PNG" width="650px;">

Not found

<img src="./src/assets/images/screenshots/not_found.PNG" width="650px;">

Repositories

<img src="./src/assets/images/screenshots/repositories.PNG" width="650px;">

Followers

<img src="./src/assets/images/screenshots/followers.PNG" width="650px;">

Mobile

<img src="./src/assets/images/screenshots/mobile.PNG" width="330px;">

## Requirements

To utilize the application, users need to generate a GitHub token by visiting the following link: `https://github.com/settings/tokens`. This token enables the application to securely authenticate and access GitHub's REST API to fetch user data.

Additionally, make sure you have [Node.js](https://nodejs.org) (minimum version 12.0.0), git, and [Angular CLI](https://angular.io/cli) installed on your machine.

Use the package manager [npm](https://www.npmjs.com/) to install the dependencies and run the application.

## Usage

After sufficing the requirements for the app, follow the steps in order to run the program:

1.  Clone the repository by using the following command

    ```
    git clone https://github.com/A-Cobra/angular.git
    ```

2.  Use the git command

    ```
    git checkout develop
    ```

3.  Open the `github-profile-fetcher` folder with your favorite ide

4.  Use the following command

    ```
    npm install
    ```

5.  Search for the environment file under the following path:

    ```
    /src/environments/environment.ts
    ```

6.  Replace the `authToken` variable's content with your GitHub token. For example, if your token was my_token, the code inside the environments.ts file would be

    ```
    export const environment = {
      production: false,
      githubEndpoint: 'https://api.github.com/users',
      followersUrlParams: '?page=1&per_page=10',
      repositoriesUrlParams: '?page=1&per_page=20',
      authToken: 'my_token',
    };
    ```

7.  Finally, run the app by using the command

    ```
    npm run sto
    ```

8.  Alternatively, you could run the following command

    ```
    ng serve
    ```

9.  If the website has not been automatically opened yet, please visit the following link:

    ```
    localhost:4200
    ```

## Technologies:

- **Angular 14**: Angular is a popular and powerful JavaScript framework for building web applications. Angular provides a comprehensive set of tools and libraries for developing dynamic and scalable applications. It follows the component-based architecture, allowing developers to create reusable components that encapsulate specific functionality.

- **SCSS**: SCSS (Sass) is a CSS preprocessor that extends the capabilities of traditional CSS. By utilizing SCSS in my project, I was able to "draw" the ingredients of the burger with enhanced flexibility and maintainability.

- **ESLint**: ESLint is a popular JavaScript linter that helps ensure code correctness and adherence to best practices. ESLint enforces a set of configurable rules that catch potential issues, enforce coding standards, and promote consistent code style across Angular applications. It helps identify problematic patterns, potential bugs, and code smells, allowing engineers to address them early in the development process and maintain a high level of code quality.

- **REST API**: REST (Representational State Transfer) is an architectural style for designing networked applications. REST APIs (Application Programming Interfaces) are a set of rules and conventions that enable communication and data exchange between systems over the internet. REST APIs are based on the principles of using HTTP methods (such as GET, POST, PUT, DELETE) to perform operations on resources identified by URLs (Uniform Resource Locators).

## License

This project is licensed under the [Apache License 2.0](../LICENSE).

## Conclusions

Overall, the Angular GitHub User Search project offers a straightforward yet functional approach to fetching and displaying GitHub user data. By utilizing a REST API, Angular observables, error handling, and CSS styling, the application provides users with an efficient and visually pleasing way to search for and view basic information about GitHub users.

## Running steps

-First clone the repo or download it

- Run the following command
  ```
  npm install
  ```

-Then, use `npm run test:coverage` to access the test coverage file, that will appear in your project directory.

-It will appear under the name `coverage`.

-Open the folder coverage and the folder `lcov-report`.

-Open the index.html file in any browser of your reference.

-ENJOY!
