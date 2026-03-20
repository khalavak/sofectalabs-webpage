import { Model } from '@stackbit/types';

export const MDR: Model = {
    name: 'MDR',
    type: 'page',
    urlPath: '/{slug}',
    hideContent: true,
    fields: [
        { name: 'title', type: 'string', required: true },
        { name: 'heroTitle', type: 'string' },
        { name: 'heroSubtitle', type: 'string', default: 'Precision engineered detection and response for the modern enterprise.' },
        { name: 'heroDescription', type: 'markdown' },
        { name: 'slug', type: 'string', required: true }
    ]
};
