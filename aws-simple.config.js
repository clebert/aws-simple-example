// @ts-check

const appName = 'aws-simple-example';
const appVersion = process.env.APP_VERSION || 'prod';

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
        appVersion === 'prod' ? appName : `${appName}-${appVersion}`
    },
    minimumCompressionSizeInBytes: 1000,
    loggingLevel: 'INFO',
    lambdaConfigs: [
      {
        httpMethod: 'GET',
        publicPath: '/bff',
        localPath: 'dist/bff/index.js',
        resourceName: 'bff',
        cachingEnabled: true,
        cacheTtlInSeconds: 3600
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
