// @ts-check

const appVersion = process.env.APP_VERSION || 'prod';

/**
 * @type {import('aws-simple').AppConfig}
 */
exports.default = {
  appName: 'AwsSimpleExample',
  appVersion,
  customDomainConfig: {
    certificateArn: process.env.CERTIFICATE_ARN,
    hostedZoneId: process.env.HOSTED_ZONE_ID,
    hostedZoneName: 'clebert.io',
    aliasRecordName:
      appVersion === 'prod'
        ? 'aws-simple-example'
        : `aws-simple-example-${appVersion}`
  },
  minimumCompressionSizeInBytes: 1000,
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
        cacheControl: `max-age=${5 * 365 * 24 * 60 * 60}` // 5 years
      }
    }
  ]
};
