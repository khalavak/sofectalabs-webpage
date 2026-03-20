import { Model } from '@stackbit/types';

export const SofectaHome: Model = {
    name: 'SofectaHome',
    type: 'page',
    urlPath: '/{slug}',
    hideContent: true,
    fields: [
        { name: 'title', type: 'string', required: true },
        { name: 'heroTitle1', type: 'string', default: 'Detection is a Science.' },
        { name: 'heroTitle2', type: 'string', default: 'Response is an Art.' },
        { name: 'heroDescription', type: 'string', default: 'Sofecta Labs provides managed Elastic SIEM/XDR and Sublime Email Security for teams that require absolute visibility.' },
        { name: 'heroPrimaryButtonText', type: 'string', default: 'REQUEST LAB ACCESS →' },
        { name: 'heroPrimaryButtonUrl', type: 'string', default: '#initiate' },
        { name: 'heroSecondaryButtonText', type: 'string', default: 'VIEW THE STACK' },
        { name: 'heroSecondaryButtonUrl', type: 'string', default: '#engine' },
        // Just keeping it simple for the POC, the rest of the page will be static in the component
    ]
};
