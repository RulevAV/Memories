const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7264';

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/authentication",
      "/authenticate",
      "/user",
      "/scienceArea",
      "/card",
      "/lesson"
    ],
    target,
    secure: false,
    logLevel: 'debug'
  }
]

module.exports = PROXY_CONFIG;
