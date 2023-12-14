import React from 'react';

import Globe from '@gravity-ui/icons/Globe';
import {Meta, StoryFn} from '@storybook/react';

import type {EnrichedLinkProps} from '../EnrichedLink';
import {EnrichedLink} from '../EnrichedLink';

import data from './data.json';

export default {
    component: EnrichedLink,
    title: 'Components/EnrichedLink',
} as Meta;

const DefaultTemplate: StoryFn<EnrichedLinkProps> = (args) => {
    return (
        <div style={{margin: '30px'}}>
            <EnrichedLink {...args} />
        </div>
    );
};

export const Default = DefaultTemplate.bind({});

Default.args = data.default as EnrichedLinkProps;

const IconTemplate: StoryFn<EnrichedLinkProps> = (args) => {
    return (
        <div style={{margin: '30px'}}>
            <EnrichedLink {...args} icon={Globe} />
        </div>
    );
};

export const Icon = IconTemplate.bind({});

Icon.args = data.icon as EnrichedLinkProps;
