import {CollectionConfig} from 'payload/types';
import path from 'path';

export type SizeDetails = {
    filename: string
    width: number
    height: number
}

export type Size = 'card' | 'square' | 'portrait' | 'feature';

export type Type = {
    filename: string
    alt: string
    mimeType: string
    sizes: {
        card?: SizeDetails
        square?: SizeDetails
        portrait?: SizeDetails
        feature?: SizeDetails
    }
}

const Media: CollectionConfig = {
    slug: 'media',
    access: {

        // Payload's access control functions apply to files also, meaning you can permit or deny file downloads easily
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    admin: {
        useAsTitle: 'filename',
        group: 'Content'
    },

    // file uploads are stored on the server by default, plugins are available for cloud storage
    // https://github.com/richardvanbergen/payload-plugin-cloud-storage as an example
    upload: {
        // staticURL: '/media',
        // staticDir: '/',
        adminThumbnail: 'thumbnail',
        // staticDir: path.resolve(__dirname, '../../media'),
        mimeTypes: ['image/png', 'image/jpeg', 'image/svg+xml'],
        imageSizes: [
            {
                name: 'thumbnail',
                width: 480,
                height: 320,
            },
            {
                name: 'portrait',
                width: 768,
                height: 1024,
            },
            {
                name: 'hero',
                width: 1920,
                height: 1080,
            }
        ],
    },

    // upload collections inherit base fields for file information and imageSizes, then add your own for users to change
    fields: [
        {
            name: 'alt',
            label: 'Alt Text',
            localized: true,
            type: 'text',
            required: true,
        },
    ],
};

export default Media;
