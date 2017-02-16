// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  // Get your access token over at http://mapbox.com
  mapbox_access_token: 'YOUR_ACCESS_TOKEN',
  // Get your style over at http://mapbox.com
  mapbox_style_url: 'mapbox://styles/ospaarmann/ciz665mhb00ff2ss2c4vzwzj5'
};
