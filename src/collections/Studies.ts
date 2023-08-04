import type {CollectionConfig} from 'payload/types'
import {Type as MediaType} from './Media';
import {Type as CategoryType} from './Categories';
import meta, {Type as MetaType} from '../fields/meta';
import {Content, Type as ContentType} from '../blocks/Content';
import {MediaBlock, Type as MediaBlockType} from '../blocks/MediaBlocks';
import Statistics, {Type as StatisticsType} from '../blocks/Statistics';
import Spacer, {Type as SpacerType} from '../blocks/Spacer';
import MediaContentCollage, {Type as MediaContentCollageType} from '../blocks/MediaContentCollage';
import StickyContent, {Type as StickyContentType} from '../blocks/StickyContent';
import CallToAction, {Type as CallToActionType} from '../blocks/CallToAction';
import Slider, {Type as SliderType} from '../blocks/Slider';
import MediaStatCollage, {Type as MediaStatCollageType} from '../blocks/MediaStatCollage';
import MediaGrid, {Type as MediaGridType} from '../blocks/MediaGrid';
import MediaCollage, {Type as MediaCollageType} from '../blocks/MediaCollage';
import StudySlider, {Type as StudySliderType} from '../blocks/StudySlider';
import CTAGrid, {Type as CTAGridType} from '../blocks/CTAGrid';
import formatSlug from "../utilities/formatSlug";

export type Layout =
    CallToActionType
    | ContentType
    | CTAGridType
    | MediaBlockType
    | MediaCollageType
    | MediaContentCollageType
    | MediaGridType
    | MediaStatCollageType
    | SliderType
    | SpacerType
    | StatisticsType
    | StickyContentType
    | StudySliderType


export type Type = {
    title: string
    featuredMedia: MediaType
    previewMedia: {
        media: MediaType
    }[]
    layout: Layout[]
    client?: string
    location?: string
    categories?: CategoryType[]
    slug: string
    meta: MetaType
}


const Studies: CollectionConfig = {
    slug: 'studies',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: (): boolean => true, // Everyone can read Pages
    },
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
        },
        {
            name: 'featuredMedia',
            label: 'Featured Media',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'layout',
            label: 'Study Layout',
            type: 'blocks',
            blocks: [
                CallToAction,
                Content,
                CTAGrid,
                MediaBlock,
                MediaCollage,
                MediaContentCollage,
                MediaGrid,
                MediaStatCollage,
                Slider,
                Spacer,
                Statistics,
                StickyContent,
                StudySlider,
            ],
        },
        {
            name: 'previewMedia',
            label: 'Preview MediaBlocks',
            labels: {
                singular: 'Media',
                plural: 'Media',
            },
            type: 'array',
            minRows: 1,
            maxRows: 3,
            fields: [
                {
                    name: 'media',
                    label: 'Media',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
        {
            name: 'client',
            label: 'Client',
            type: 'text',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'location',
            label: 'Location',
            type: 'text',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            // allow selection of one or more categories
            hasMany: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'slug',
            label: 'Slug',
            type: 'text',
            admin: {
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [formatSlug('title')],
            },
        },
        meta
    ],
};

export default Studies;
