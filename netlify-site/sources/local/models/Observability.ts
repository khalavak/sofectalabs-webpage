import { Model } from '@stackbit/types';

export const Observability: Model = {
    name: 'Observability',
    type: 'page',
    urlPath: '/{slug}',
    hideContent: true,
    fields: [
        { name: 'title', type: 'string', required: true },
        { name: 'heroTitle', type: 'string' },
        { name: 'heroSubtitle', type: 'string' },
        { name: 'slug', type: 'string', required: true }
    ]
};
