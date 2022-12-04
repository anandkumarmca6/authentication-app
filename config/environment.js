const development = {
  name: 'development',
  asset_path: 'assets',
  session_cookie_key: '@1925',
  port: 6564,
  clientID: 'demo',
  clientSecret: 'demo',
  callbackURL: 'demo',
};

const production = {
  name: process.env.ENVIRONMENT,
  asset_path: process.env.ASSET_PATH,
  session_cookie_key: process.env.SESSION_COOKIE_KEY,
  port: process.env.PORT,
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL,
};

module.exports = eval(
  process.env.ENVIRONMENT == undefined
    ? development
    : eval(process.env.ENVIRONMENT)
);
