import 'dotenv/config';

export default{
  "expo": {
    "name": "ShoppingApp",
    "slug": "ShoppingApp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    // extra: {
    //   apiKey: ,
    //   authDomain: "shopping-app-691fd.firebaseapp.com",
    //   projectId: "shopping-app-691fd",
    //   storageBucket: "shopping-app-691fd.appspot.com",
    //   messagingSenderId: "897286761932",
    //   appId: "1:897286761932:web:1d75ce21a2dffc03f60169",
    //   measurementId: "G-18YBRYQCM0"
    // }
  }
}
