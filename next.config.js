require('dotenv').config()
const path = require('path');
const {withPayload} = require('@payloadcms/next-payload');

module.exports = withPayload({
      reactStrictMode: false,
      swcMinify: true,
      images: {
        domains: ['localhost', process.env.BUCKET_URL, process.env.PAYLOAD_PUBLIC_SERVER_URL],
      },
      publicRuntimeConfig: {
        SERVER_URL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
      }
    },
    {
      // The second argument to `withPayload`
      // allows you to specify paths to your Payload dependencies.

      // Point to your Payload config (Required)
      configPath: path.resolve(__dirname, 'src/payload.config.ts'),

      // Point to your exported, initialized Payload instance (optional, default shown below`)
      // payloadPath: path.resolve(process.cwd(), './payload/payloadClient.ts'),
    }
)
