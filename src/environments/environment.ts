// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlAPI: 'http://192.168.0.229:3000/api',
  beUrl: 'http://192.168.0.229:3000/',


  // urlAPI: 'http://ec2-44-201-231-118.compute-1.amazonaws.com:3000/api',
  // beUrl: 'http://ec2-44-201-231-118.compute-1.amazonaws.com:3000/',

  firebase: {
    apiKey: "AIzaSyAl0OAwPbUHopfVYFKhXhg8IoKLFtCIXAA",
    authDomain: "berissocompra-b103e.firebaseapp.com",
    projectId: "berissocompra-b103e",
    storageBucket: "berissocompra-b103e.appspot.com",
    messagingSenderId: "696931160891",
    appId: "1:696931160891:web:cf21d893d26a1ba9e95d1e"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
