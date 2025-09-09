export const browserStackConfig = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  hostname: "hub.browserstack.com",
  capabilities: [{
    "bstack:options": {
      userName: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
      deviceName: "Samsung Galaxy S22 Ultra",
      osVersion: "12.0",
      deviceOrientation: "portrait",
      projectName: "WebdriverIO Appium Project",
      buildName: "WebdriverIO Android",
      app: "bs://5dc138d1225e99dab2be5ab3bae3ffd3523af356"  
    },
    platformName: "Android"
  }],
  services:[["browserstack", {browserStackLocal:false} ]]
};