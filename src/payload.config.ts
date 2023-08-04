import dotenv from 'dotenv'
import path from 'path'
import {cloudStorage} from '@payloadcms/plugin-cloud-storage';

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
})

import {buildConfig} from 'payload/config'

import Pages from './collections/Pages'
import Categories from './collections/Categories'
import FormSubmissions from "./collections/FormSubmissions";
import Studies from "./collections/Studies";
import SocialMedia from "./globals/SocialMedia";
import MegaMenu from "./globals/MegaMenu";
import Footer from "./globals/Footer";
import Media from "./collections/Media";
import {gcsAdapter} from "@payloadcms/plugin-cloud-storage/gcs";

export default buildConfig({
    localization: {
        locales: [
            'en',
            'es',
            'de',
        ],
        defaultLocale: 'en',
        fallback: true,
    },
    plugins: [
        cloudStorage({
            collections: {
                media: {
                    adapter: gcsAdapter({
                        options: {
                            credentials: {
                                type: "service_account",
                                private_key:process.env.GCP_PRIVATE_KEY,
                                client_email: process.env.GCP_CLIENT_EMAIL,
                                client_id: process.env.GCP_CLIENT_ID,
                            },
                        },
                        //@ts-ignore
                        bucket: process.env.GCS_BUCKET,
                        acl: "Public",
                    }),
                },
            },
        }),
    ],
    serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    collections: [Pages, Categories, FormSubmissions, Studies, Media],
    globals: [
        MegaMenu,
        SocialMedia,
        Footer,
    ],
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    cors: ['*'],
    admin: {
        webpack: (config) => ({
            ...config,
            resolve: {
                ...config.resolve,
            }
        })
    }
})


