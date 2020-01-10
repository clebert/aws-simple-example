# aws-simple-example

![](https://github.com/clebert/aws-simple-example/workflows/CI/badge.svg)

A Parcel+React+TypeScript app to demonstrate the use of
[`aws-simple`](https://github.com/clebert/aws-simple).

## Description

Essentially, this example app consists of a React component that retrieves text
from a Lambda function using a `React.useEffect` hook and displays it. Parcel is
used for bundling and TypeScript as language. You can see the deployed website
[here](https://aws-simple-example.clebert.io/).

The following app config can be used as a template for your own Parcel app:

```js
// @ts-check

const appName = 'aws-simple-example';
const appVersion = process.env.APP_VERSION || 'latest';

/**
 * @type {import('aws-simple').AppConfig}
 */
exports.default = {
  appName,
  appVersion,
  createStackConfig: () => ({
    customDomainConfig: {
      certificateArn: process.env.CERTIFICATE_ARN,
      hostedZoneId: process.env.HOSTED_ZONE_ID,
      hostedZoneName: 'clebert.io',
      aliasRecordName:
        appVersion === 'latest' ? appName : `${appName}-${appVersion}`
    },
    minimumCompressionSizeInBytes: 1000,
    lambdaConfigs: [
      {
        httpMethod: 'GET',
        publicPath: '/bff',
        localPath: 'dist/bff/index.js',
        description: 'BFF',
        loggingLevel: 'INFO'
      }
    ],
    s3Configs: [
      {
        type: 'file',
        publicPath: '/',
        localPath: 'dist/app/index.html',
        bucketPath: 'index.html'
      },
      {
        type: 'folder',
        publicPath: '/assets',
        localPath: 'dist/app',
        responseHeaders: {
          // Since the assets have a fingerprint, they can be cached permanently
          // in the browser.
          cacheControl: `max-age=${5 * 365 * 24 * 60 * 60}` // 5 years
        }
      }
    ]
  })
};
```

---

Copyright (c) 2019, Clemens Akens. Released under the terms of the
[MIT License](https://github.com/clebert/aws-simple-example/blob/master/LICENSE).
