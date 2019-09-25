// @ts-check

/**
 * @type {import('aws-simple').StackConfig}
 */
exports.default = {
  appName: 'aws-simple-example',
  stackId: 'prod',
  customDomainConfig: {
    certificateArn: process.env.CERTIFICATE_ARN,
    hostedZoneId: process.env.HOSTED_ZONE_ID,
    hostedZoneName: 'clebert.io',
    aliasRecordName: 'aws-simple-example'
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
