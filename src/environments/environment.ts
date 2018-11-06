// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCrp5HB27O7peI13bkhxRfy2Ee5Z8HlkxY",
    authDomain: "the-wisdom-whisperer.firebaseapp.com",
    databaseURL: "https://the-wisdom-whisperer.firebaseio.com",
    projectId: "the-wisdom-whisperer",
    storageBucket: "the-wisdom-whisperer.appspot.com",
    messagingSenderId: "831143241163"
  }
};
