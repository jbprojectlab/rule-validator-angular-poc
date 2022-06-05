const PROXY_CONFIG = {
  "/api": {
    "target": "localhost:7200",
    "changeOrigin": true,
    "secure": false,
  }
}
module.exports = PROXY_CONFIG;
