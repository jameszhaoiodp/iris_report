// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// url: 'http://uluru.ship.iodp.tamu.edu:8080/'
export const environment = {
    production: false,
    // url: 'http://uluru.ship.iodp.tamu.edu:8080/',
  //   serverUrl: 'http://shorttc.iodp.tamu.edu:8080',
    serverUrl: window.location.origin + '/api',
    host: window.location.host,
    version: '1.1'
};
