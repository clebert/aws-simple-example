# aws-simple-example

![][ci-badge]

A Parcel+React+TypeScript app to demonstrate the use of
[`aws-simple`][aws-simple].

## Description

Essentially, this example app consists of a React component that retrieves text
from a Lambda function using a `React.useEffect` hook and displays it. Parcel is
used for bundling and TypeScript as language. You can see the deployed website
[here][website].

The following app config can be used as a template for your own Parcel app:

```js
exports.default = {
  appName: 'aws-simple-example',
  defaultStackName: 'prod',
  region: 'eu-central-1',
  customDomainConfig: {
    certificateArn: process.env.CERTIFICATE_ARN,
    hostedZoneId: process.env.HOSTED_ZONE_ID,
    hostedZoneName: 'clebert.io',
    getAliasRecordName: stackName =>
      `aws-simple-example${stackName === 'prod' ? '' : `-${stackName}`}`
  },
  minimumCompressionSize: 1000,
  loggingLevel: 'INFO',
  lambdaConfigs: [
    {
      httpMethod: 'GET',
      publicPath: '/bff',
      localPath: 'dist/bff/index.js',
      cachingEnabled: true,
      cacheTtlInSeconds: 60
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
        cacheControl: 'max-age=157680000' // 5 years
      }
    }
  ]
};
```

---

Copyright (c) 2019, Clemens Akens. Released under the terms of the [MIT
License][license].

[aws-simple]: https://github.com/clebert/aws-simple
[aws-simple-config]:
  https://github.com/clebert/aws-simple-example/blob/master/aws-simple.config.js
[ci-badge]: https://github.com/clebert/aws-simple-example/workflows/CI/badge.svg
[license]: https://github.com/clebert/aws-simple-example/blob/master/LICENSE
[website]: https://aws-simple-example.clebert.io/
