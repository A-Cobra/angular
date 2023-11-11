# NgReactiveForm

No typescript interfaces or types were used, it is there because I thought I would need it.

Also, the defaultUser isn't necessary as well. For the same reason.

The application worked with a REST API to get information for countries and states.
Sadly, the Bearer token does last just 1 day. It would become impossible to maintain it. Therefore, I decided to not make the country and state a requirement. I even commented a part of code located at the `form.component.html` file. If you decide to try it out with the API, you can uncomment some lines in the ts file as well to get some validations. Additionally, change the environments.ts file variable `authToken` with your Bearer token.
The following is the link to access to the token: `https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city`
