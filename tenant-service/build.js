const StyleDictionaryPackage = require('style-dictionary');

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

function getStyleDictionaryConfig(brand, platform) {
  return {
    "source": [
      `properties/brands/${brand}/*.json`,
      "properties/globals/**/*.json",
      `properties/platforms/${platform}/*.json`
    ],
    "platforms": {
      "web": {
        "transformGroup": "js",
        "buildPath": `build/web/${brand}/`,
        "files": [
          {
            "destination": "theme.js",
            "format": "javascript/object"
          }
        ]
      }
    }
  };
}

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

['brand1', 'brand2'].map(function (brand) {
  ['web'].map(function (platform) {

    console.log('\n==============================================');
    console.log(`\nProcessing: [${platform}] [${brand}]`);

    const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, platform));

    StyleDictionary.buildPlatform(platform);

    console.log('\nEnd processing');

  })
})

console.log('\n==============================================');
console.log('\nBuild completed!');