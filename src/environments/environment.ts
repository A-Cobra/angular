// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  githubEndpoint: 'https://api.github.com/users',
  followersUrlParams: '?page=1&per_page=10',
  repositoriesUrlParams: '?page=1&per_page=20',
  authToken: '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',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
